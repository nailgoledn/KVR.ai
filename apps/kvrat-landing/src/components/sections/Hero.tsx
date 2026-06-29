'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Button, Input } from '../ui/primitives';
import { colors, spacing, typography } from '@/src/design-system';

export default function Hero() {
  const [idea, setIdea] = useState('');
  const router = useRouter();

  const goToDashboard = () => {
    const q = idea.trim() ? `?idea=${encodeURIComponent(idea.trim())}` : '';
    router.push(`/dashboard${q}`);
  };

  return (
    <section
      id="hero"
      style={{
        backgroundColor: colors.white,
        padding: `${spacing[20]} ${spacing[4]}`,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container size="xl">
        <div style={{ textAlign: 'center' }}>
          {/* Headline */}
          <h1
            style={{
              fontSize: typography.fontSize['7xl'],
              fontWeight: 700,
              color: colors.black,
              marginBottom: spacing[6],
              fontFamily: typography.fontFamily.grotesk,
              lineHeight: 1.1,
            }}
          >
            KVRAT.ai
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: typography.fontSize.xl,
              color: colors.gray[600],
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: spacing[12],
              lineHeight: 1.6,
            }}
          >
            Transform your startup idea into a production-ready application.
            <br />
            Backend, Frontend, API, and Dashboard—generated in minutes with autonomous AI agents.
          </p>

          {/* Input Field */}
          <div style={{ maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto', marginBottom: spacing[8] }}>
            <Input
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Example: Build an AI-powered booking platform for gyms"
            />
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: spacing[4],
              flexWrap: 'wrap',
            }}
          >
            <Button size="lg" onClick={goToDashboard}>
              Generate Blueprint
            </Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See How It Works
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
