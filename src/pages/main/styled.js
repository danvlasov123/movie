import styled from "styled-components";

import { PostItem } from "../favorites/styled";

export const Card = styled(PostItem)`
  width: calc(25% - 10px);
  height: 600px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  > img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  h3,
  p {
    margin: 0;
  }
`;

export const IconBlock = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  background: #ffffff;
  border-radius: 50%;
  cursor: pointer;
  width: 24px;
  height: 24px;
  > svg {
    width: 24px;
    height: 24px;
    path {
      fill: ${({ active }) => (active ? "gold" : "black")};
    }
  }
`;

export const Flex = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
