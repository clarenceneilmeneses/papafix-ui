import { useState } from 'react';
import { Shell } from '../components/Shell.jsx';
import { AppHeader } from '../components/AppHeader.jsx';
import {
  Card, Button, LinkButton, StatusPill,
  EmptyState, ErrorState, SkeletonList, useAsync,
} from '../components/ui.jsx';
import { Plus, MapPin } from '../components/Icons.jsx';   // MapPin: empty state only
import { api } from '../mock/api.js';
import { useScenario } from '../mock/scenario.jsx';

export default function Addresses() {
  const { scenario, setScenario } = useScenario();
  const [defaultId, setDefaultId] = useState('addr-1');
  const { status, data, error } = useAsync(() => api.getAddresses(scenario), [scenario]);
  const list = data ?? [];

  const hero = (
    <AppHeader
      back
      title="My Addresses"
      action={
        <Button variant="outline" size="sm">
          <Plus size={18} /> Add new
        </Button>
      }
    />
  );

  return (
    <Shell hero={hero}>
      <div className="page">
        {status === 'loading' && <SkeletonList count={2} lines={2} />}

        {status === 'error' && (
          <ErrorState body={error.message} onRetry={() => setScenario('loaded')} />
        )}

        {status === 'done' && list.length === 0 && (
          <EmptyState
            icon={MapPin}
            title="No saved addresses"
            body="Add an address so technicians know where to go."
            action={<Button variant="outline" size="sm"><Plus size={18} /> Add new</Button>}
          />
        )}

        {status === 'done' && list.length > 0 && (
          <div className="card-stack">
            {list.map((a) => {
              const isDefault = a.id === defaultId;
              return (
                <Card key={a.id}>
                  {/* NO leading icon here, deliberately. Every address had the
                      same map pin, so it carried no information — the same
                      criticism levelled at production's identical blue dots —
                      and it forced the address line to indent past it, giving
                      the card two competing left edges. Without it the label,
                      the address and the card padding all share one edge.

                      The row keeps a 48px floor so a card showing a pill and a
                      card showing a link are the same height. */}
                  <div className="row-between" style={{ minHeight: 'var(--touch-target-min)' }}>
                    <h3 className="t-title-lg truncate">{a.label}</h3>
                    {/* Production showed "Set default" on what looked like an
                        already-default address, with no state for "this one
                        IS the default". The two states are distinct now and
                        only one is an action. */}
                    {isDefault
                      ? <StatusPill status="scheduled" label="Default" />
                      : <LinkButton onClick={() => setDefaultId(a.id)}>Set default</LinkButton>}
                  </div>

                  <p
                    className="t-body-md c-on-surface-variant"
                    style={{ marginTop: 'var(--space-xs)' }}
                  >
                    {a.line}
                  </p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Shell>
  );
}
