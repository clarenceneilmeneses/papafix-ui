import { useState } from 'react';
import { Shell } from '../../components/Shell.jsx';
import { AppHeader } from '../../components/AppHeader.jsx';
import {
  Card, Chip, Field, Button, StickyBar, SectionLabel, StatusPill,
  EmptyState, ErrorState, SkeletonList, useAsync,
} from '../../components/ui.jsx';
import { Inbox } from '../../components/Icons.jsx';
import { api } from '../../mock/api.js';
import { useScenario } from '../../mock/scenario.jsx';

const MAX_MESSAGE = 1000;

/* Technician support. Same two-tab shape as the customer app — one segmented
   control, one raised thumb — with topics a technician actually has.
   Production's topics were the customer's list verbatim ("Booking",
   "Payment", "Account", "App problem", "Other"), which gave a technician
   nowhere to file "the customer was not home" or "I was not paid".

   The disabled Send button also used white text on washed orange, about
   1.6:1 — unreadable rather than merely dim. It uses the shared disabled
   token now. See TECH-APP-REVIEW.md §2b. */
const TECH_TOPICS = [
  'A job',
  'Payout',
  'My schedule',
  'My account',
  'App problem',
  'Other',
];

function NewMessage() {
  const [topic, setTopic] = useState(TECH_TOPICS[0]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const ready = subject.trim().length > 0 && body.trim().length > 0;

  return (
    <>
      <div className="shell__sheet">
        <div className="page pad-for-bar">
          <SectionLabel>Topic</SectionLabel>
          <div className="chip-wrap">
            {TECH_TOPICS.map((t) => (
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
                rows={6}
                maxLength={MAX_MESSAGE}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Tell us what you need help with."
              />
            </Field>
          </div>
        </div>
      </div>

      <StickyBar hint={ready ? null : 'Add a subject and a message to send.'}>
        <Button disabled={!ready}>Send message</Button>
      </StickyBar>
    </>
  );
}

function MyMessages() {
  const { scenario, setScenario } = useScenario();
  const { status, data, error } = useAsync(() => api.getTechTickets(scenario), [scenario]);
  const tickets = data ?? [];

  return (
    <div className="shell__sheet">
      <div className="page">
        {status === 'loading' && <SkeletonList count={2} lines={2} />}
        {status === 'error' && (
          <ErrorState body={error.message} onRetry={() => setScenario('loaded')} />
        )}
        {status === 'done' && tickets.length === 0 && (
          <EmptyState
            icon={Inbox}
            title="No messages yet"
            body="Anything you send us appears here, along with our reply."
          />
        )}
        {status === 'done' && tickets.length > 0 && (
          <div className="card-stack">
            {tickets.map((t) => (
              <Card key={t.id}>
                <div className="row-between">
                  <h3 className="t-title-lg">{t.subject}</h3>
                  <StatusPill status={t.status} />
                </div>
                <p className="t-body-md c-on-surface-variant" style={{ marginTop: 2 }}>
                  {t.topic} · {t.date}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TechSupport() {
  const [tab, setTab] = useState('new');

  return (
    <div className="shell">
      <div className="shell__hero">
        <AppHeader back title="Help & Support" />
        <div className="segmented mt-lg" role="tablist" aria-label="Support">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'new'}
            className={`segmented__item t-title-md${tab === 'new' ? ' is-active' : ''}`}
            onClick={() => setTab('new')}
          >
            New message
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'mine'}
            className={`segmented__item t-title-md${tab === 'mine' ? ' is-active' : ''}`}
            onClick={() => setTab('mine')}
          >
            My messages
          </button>
        </div>
      </div>

      {tab === 'new' ? <NewMessage /> : <MyMessages />}
    </div>
  );
}
