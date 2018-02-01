import * as React from 'react';

export function Page(props: {children: any}) {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        margin: '0 6vw 10em',
      }}>
      {props.children}
    </main>
  );
}
