import styled from 'styled-components';

type Props = any;

export const Controls = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  margin-left: 5px;
  height: 50px;
  display: flex;
  align-items: center;
`;

const ButtonMac = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0px 4px;
  line-height: 0;
  padding: 0px;
  -webkit-app-region: no-drag;
  position: relative;
  overflow: hidden;
  border: none;
  box-shadow: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonMacMaximize = styled(ButtonMac)`
  border: 1px solid #12ac28;
  background-color: #28c940 !important;

  & svg.enter-fullscreen-svg {
    width: 6px;
    height: 6px;
    opacity: 0;
    transform: scaleX(-1);
  }

  &.hover {
    svg.enter-fullscreen-svg {
      opacity: 1;
    }
  }

  &:active {
    border-color: #128622;
    background-color: #1f9a31 !important;
  }

  // .fullscreen {
  //   .enter-fullscreen-svg {
  //     opacity: 0;
  //   }

  //   .exit-fulscreen-svg {
  //     opacity: 0;
  //   }
  // }
`;

export const ButtonMacClose = styled(ButtonMac)`
  border: 1px solid #e2463f;
  background-color: #ff5f57 !important;
  margin-left: 10px;

  & svg {
    width: 6px;
    height: 6px;
    opacity: 0;
  }

  &.hover {
    svg {
      opacity: 1;
    }
  }

  &:active {
    border-color: #ad3934;
    background-color: #bf4943 !important;
  }
`;

export const ButtonMacMinimize = styled(ButtonMac)`
  border: 1px solid #e1a116;
  background-color: #ffbd2e !important;

  & svg {
    width: 6px;
    height: 6px;
    opacity: 0;
  }

  &.hover {
    svg {
      opacity: 1;
    }
  }

  &:active {
    border-color: #ad7d15;
    background-color: #bf9123 !important;
  }
`;
