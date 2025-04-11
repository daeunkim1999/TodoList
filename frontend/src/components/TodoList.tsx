import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, List, ListItem, useMediaQuery, useTheme } from '@mui/material';
import { Todo, Priority } from '../types';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { StyledPaper, GlobalStyles } from '../styles/TodoStyles';

// localStorage 키 상수
const TODOS_STORAGE_KEY = 'todos-data';

// 우선순위에 따른 색상 정의
const priorityColors = {
  [Priority.HIGH]: {
    bg: '#ffb3b3',
    text: '#d32f2f', // 더 연한 빨간색
    label: '높음'
  },
  [Priority.MEDIUM]: {
    bg: '#ffe082', 
    text: '#ed6c02', // 더 연한 주황색
    label: '중간'
  },
  [Priority.LOW]: {
    bg: '#c8e6c9',
    text: '#2e7d32', // 더 연한 초록색
    label: '낮음'
  }
};

const TodoList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // localStorage에서 데이터 불러오기
  const loadTodosFromStorage = (): Todo[] => {
    const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
    if (savedTodos) {
      try {
        // JSON으로 파싱하고 Date 객체 복원
        const parsedTodos = JSON.parse(savedTodos, (key, value) => {
          if (key === 'createdAt') return new Date(value);
          return value;
        });
        return parsedTodos;
      } catch (error) {
        console.error('Todo 데이터 로딩 중 오류 발생:', error);
        return [];
      }
    }
    return [];
  };

  const [todos, setTodos] = useState<Todo[]>(loadTodosFromStorage());

  // todos가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = useCallback((text: string, priority: Priority) => {
    const todo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
      priority // 사용자가 선택한 우선순위 사용
    };
    setTodos(prev => [...prev, todo]);
  }, []);

  const handleDeleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const handleToggleTodo = useCallback((id: number) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const handleEditTodo = useCallback((id: number, newText: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  }, []);

  const handleChangePriority = useCallback((id: number, priority: Priority) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, priority } : todo
    ));
  }, []);

  // 우선순위에 따른 배경색 가져오기
  const getPriorityBackgroundColor = (priority: Priority) => {
    return priorityColors[priority].bg;
  };

  // 완료되지 않은 항목을 먼저, 완료된 항목을 나중에 표시하도록 정렬
  const sortedTodos = [...todos].sort((a, b) => {
    // 완료 상태가 다른 경우: 완료되지 않은 항목(false)이 먼저 오도록
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1; // 완료된 항목은 뒤로
    }
    
    // 완료 상태가 같은 경우: 우선순위 순으로 정렬
    if (!a.completed && !b.completed) {
      // 완료되지 않은 항목들은 우선순위(높음->중간->낮음) 및 생성일 기준
      const priorityOrder = { 
        [Priority.HIGH]: 0, 
        [Priority.MEDIUM]: 1, 
        [Priority.LOW]: 2 
      };
      
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      
      // 우선순위가 같으면 생성일 기준(최신순)
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else {
      // 완료된 항목들은 완료 시간이 없으므로 생성일 기준(최신순)
      return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  return (
    <>
      <GlobalStyles />
      <StyledPaper elevation={isMobile ? 0 : 3}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ fontWeight: 'bold', mb: isMobile ? 2 : 3 }}
        >
          Todo List
        </Typography>
        <Box mb={isMobile ? 1.5 : 2}>
          <TodoForm onAdd={handleAddTodo} />
        </Box>
        <List sx={{ padding: 0 }}>
          {sortedTodos.map((todo) => (
            <ListItem
              key={todo.id}
              disableGutters
              sx={{
                backgroundColor: getPriorityBackgroundColor(todo.priority),
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                borderRadius: isMobile ? 1 : 2,
                mb: 1,
                p: 0,
                overflow: 'hidden'
              }}
            >
              <TodoItem
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
                onChangePriority={handleChangePriority}
                isMobile={isMobile}
              />
            </ListItem>
          ))}
          {todos.length === 0 && (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 3, 
                color: 'text.secondary',
                fontSize: isMobile ? '0.9rem' : '1rem'
              }}
            >
              할일을 추가해보세요!
            </Box>
          )}
        </List>
      </StyledPaper>
    </>
  );
};

export default TodoList; 