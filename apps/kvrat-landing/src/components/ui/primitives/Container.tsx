/**
 * Container Component
 * 
 * Consistent max-width container for page sections.
 */

import React from 'react';
import { containerSizes, spacingPresets } from '@/src/design-system';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof containerSizes;
  children: React.ReactNode;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'xl', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          maxWidth: containerSizes[size],
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: spacingPresets.containerPaddingDesktop,
          paddingRight: spacingPresets.containerPaddingDesktop,
          width: '100%',
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
