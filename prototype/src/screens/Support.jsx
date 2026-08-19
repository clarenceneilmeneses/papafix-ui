import { useState } from 'react';
import { Shell } from '../components/Shell.jsx';
import { AppHeader } from '../components/AppHeader.jsx';
import {
  Card, Chip, Field, Button, StickyBar, SectionLabel, StatusPill,
  EmptyState, ErrorState, SkeletonList, useAsync,
} from '../components/ui.jsx';
import { Inbox } from '../components/Icons.jsx';
import { api } from '../mock/api.js';
import { useScenario } from '../mock/scenario.jsx';
import { supportTopics } from '../mock/data.js';

const MAX_MESSAGE = 1000;

/* Help & Support.
 *
 * Production's tab control was two full-width buttons where the inactive half
 * was a white pill with a border — it looked like a second, competing action
 * rather than the other half of a toggle. This is the standard segmented
 * control: one track, one raised thumb, so it reads as one control with two
 * positions.
 *
 * The ticket cards also gave subject, topic, date and body four nearly
 * identical treatments. Now: subject is the only title, topic and date are one
 * metadata line, and the support reply is tinted and inset so it can never be
 * mistaken for more of the customer's own message.
 */
function NewMessage() {
  const [topic, setTopic] = useState(supportTopics[0]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const ready = subject.trim().length > 0 && body.trim().length > 0;

  return (
    <>
      <div className="shell__sheet">
        <div className="page">
          <SectionLabel>Topic</SectionLabel>
          <div className="chip-wrap">
            {supportTopics.map((t) => (
              <Chip key={t} selected={topic === t} onClick={() => setTopic(t)}>{t}</Chip>
            ))}
          </div>

          <div className="section">
            <Field label="Subject">
              <input
                className="field__input t-body-lg"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Short summary"
              />
            </Field>
          </div>

          <div className="section">
            <Field label="Message" counter={`${body.length}/${MAX_MESSAGE}`}>
              <textarea
                className="field__textarea t-body-lg"
                maxLength={MAX_MESSAGE}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Tell us what you need help with."
              />
            </Field>
          </div>
        </div>
      </div>

      {/* Production's disabled Send button was white on 40%-opacity blue and
          was effectively unreadable. Shared .btn:disabled treatment, and the
          hint says what is missing instead of leaving the user to guess. */}
      <StickyBar hint={ready ? null : 'Add a subject and a message to send.'}>
        <Button disabled={!ready}>Send Message</Button>
      </StickyBar>
    </>
  );
}

function TicketCard({ t }) {
  return (
    <Card>
      <div className="row-between">
        <h3 className="t-title-lg" style={{ minWidth: 0 }}>{t.subject}</h3>
        <StatusPill status={t.status} />
      </div>

      <p className="t-body-md c-on-surface-variant" style={{ marginTop: 'var(--space-xs)' }}>
        {t.topic} · {t.date}
      </p>

      <p className="t-body-lg" style={{ marginTop: 'var(--space-md)' }}>{t.body}</p>

      {t.reply && (
        <div className="reply">
          <span className="t-label-sm">{t.reply.from} · {t.reply.date}</span>
          <span className="reply__body t-body-lg">{t.reply.body}</span>
        </div>
      )}
    </Card>
  );
}

function MyMessages({ scenario, setScenario }) {
  const { status, data, error } = useAsync(() => api.getTickets(scenario), [scenario]);
  const list = data ?? [];

  return (
    <div className="shell__sheet">
      <div className="page">
        {status === 'loading' && <SkeletonList count={2} lines={2} />}

        {status === 'error' && (
          <ErrorState body={error.message} onRetry={() => setScenario('loaded')} />
        )}

        {status === 'done' && list.length === 0 && (
          <EmptyState
            icon={Inbox}
            title="No messages yet"
            body="Send us a message and the conversation will show up here."
          />
        )}

        {status === 'done' && list.length > 0 && (
          <div className="card-stack">
            {list.map((t) => <TicketCard key={t.id} t={t} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Support() {
  const [tab, setTab] = useState('new');
  const { scenario, setScenario } = useScenario();

  // The count comes from the same loader the list uses, so the two can never
  // disagree — production hardcoded "(2)" beside a list that could be empty.
  const { data } = useAsync(() => api.getTickets(scenario), [scenario]);
  const count = data ? data.length : null;

  const TABS = [
    ['new', 'New message'],
    ['mine', count === null ? 'My messages' : `My messages (${count})`],
  ];

  /* Header and tabs live in the hero and stay put; only the panel below them
     scrolls. The two tabs are peers, so the control must not move when you
     switch between them. */
  const hero = (
    <>
      <AppHeader back title="Help & Support" />
      <div className="segmented segmented--onhero mt-lg" role="tablist">
        {TABS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={`segmented__item t-title-md${tab === id ? ' is-active' : ''}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );

  return (
    <div className="shell">
      <div className="shell__hero">{hero}</div>
      {tab === 'new'
        ? <NewMessage />
        : <MyMessages scenario={scenario} setScenario={setScenario} />}
    </div>
  );
}
