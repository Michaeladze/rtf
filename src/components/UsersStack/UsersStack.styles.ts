import styled from 'styled-components';

interface IUserStackedItemProps {
  index: number;
}

export const UserStackRow = styled.div`
  display: flex;
  align-items: center;
`;

export const UserStackedItem = styled.div`
  width: 35px;
  min-width: 35px;
  height: 35px;
  border: 2px solid #fff;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateX(
    ${(props: IUserStackedItemProps) => -0.5 * props.index}rem
  );

  &:last-of-type {
    display: none;
  }
`;

export const UserStackCount = styled.span`
  font-size: 1.125rem;
  font-weight: 500;
  font-style: normal;
  color: #3252ff;
  cursor: pointer;
`;
