import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import { Global, css } from '@emotion/react';

// Global 스타일 컴포넌트
export const GlobalStyles = () => (
  <Global
    styles={css`
      .draggable-item {
        transition: transform 0.01s !important;
      }
      .draggable-item.dragging {
        transition: none !important;
      }
      
      @media (max-width: 600px) {
        body {
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
      }
    `}
  />
);

export const StyledPaper = styled(Paper)`
  padding: 16px;
  margin: 16px auto;
  width: 100%;
  max-width: 600px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 600px) {
    margin: 0;
    padding: 12px;
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    box-shadow: none;
    min-height: 100vh;
  }
`;

export const DroppableList = styled.div<{ isDraggingOver: boolean }>`
  min-height: 100px;
  padding: 8px 0;
  background-color: ${props => props.isDraggingOver ? '#e9ecef' : 'transparent'};
  transition: background-color 0.2s ease;
`;

export const DraggableItem = styled.div<{ isDragging: boolean }>`
  margin-bottom: 8px;
  background-color: ${props => props.isDragging ? '#f0f4f8' : '#ffffff'};
  box-shadow: ${props => props.isDragging ? '0 5px 10px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.05)'};
  will-change: transform;
  
  &:last-child {
    margin-bottom: 0;
  }
`;