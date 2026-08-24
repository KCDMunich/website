import { ImageResponse } from 'next/og';

import { EVENT_CONFIG } from '@/lib/event-config';

export const alt = 'Cloud Native Summit Munich — June 14–15, 2027';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#00394c',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 620,
            height: 620,
            right: -120,
            top: -210,
            borderRadius: 9999,
            background: 'rgba(11, 187, 239, 0.20)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 460,
            height: 460,
            right: 40,
            bottom: -300,
            borderRadius: 9999,
            border: '3px solid rgba(11, 187, 239, 0.35)',
          }}
        />
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 72px 58px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 33, lineHeight: 1.08 }}>
            <span>Cloud Native</span>
            <span style={{ color: '#0bbbef' }}>Summit Munich</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 70, lineHeight: 1.02, letterSpacing: '-3px' }}>
              Cloud Native returns
            </div>
            <div
              style={{
                display: 'flex',
                color: '#0bbbef',
                fontSize: 70,
                lineHeight: 1.02,
                letterSpacing: '-3px',
              }}
            >
              to Munich.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 27 }}>
            <span>{EVENT_CONFIG.upcoming.dateLabel}</span>
            <span style={{ color: '#0bbbef' }}>•</span>
            <span>{EVENT_CONFIG.upcoming.venue}</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
