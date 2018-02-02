import * as React from 'react';

export function Page(props: {children: any}) {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '2vw 6vw 10em',
        width: '100%',
        maxWidth: '1024px',
        alignSelf: 'center',
      }}>
      {props.children}
    </main>
  );
}
