import { FooterTheme } from '@/features/bubble/types';
import { Show, onCleanup, onMount } from 'solid-js';

type Props = {
  footer?: FooterTheme;
  botContainer: HTMLDivElement | undefined;
  poweredByTextColor?: string;
  badgeBackgroundColor?: string;
};

const defaultTextColor = '#303235';

export const Badge = (props: Props) => {
  let liteBadge: HTMLAnchorElement | undefined;
  let observer: MutationObserver | undefined;

  const appendBadgeIfNecessary = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((removedNode) => {
        if ('id' in removedNode && liteBadge && removedNode.id == 'lite-badge') {
          console.log("Sorry, you can't remove the brand 😅");
          props.botContainer?.append(liteBadge);
        }
      });
    });
  };

  onMount(() => {
    if (!document || !props.botContainer) return;
    observer = new MutationObserver(appendBadgeIfNecessary);
    observer.observe(props.botContainer, {
      subtree: false,
      childList: true,
    });
  });

  onCleanup(() => {
    if (observer) observer.disconnect();
  });

  return (
    <div
      style={{
        'font-size': '12px',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'background-color': 'transparent',
        padding: '8px',
        'border-radius': '4px',
      }}
    >
      Powered by
      <a
        href="https://whispered.ai/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ 'margin-left': '2px', display: 'flex', 'align-items': 'center', 'text-decoration': 'none', 'font-weight': 'bold', color: '#333' }}
      >
        <img
          src="https://whispered.ai/wp-content/uploads/2023/06/favicon.png"
          alt="logo"
          style={{ width: '15px', height: '15px', 'vertical-align': 'middle', 'margin-right': '2px' }}
        />
        <span style={{ 'letter-spacing': '-1px' }}>whispered.ai</span>
      </a>
    </div>
  );
};

