import React, { useState, memo } from 'react';
import { 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Chip,
  Tooltip
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Check as CheckIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  FlagRounded as FlagIcon
} from '@mui/icons-material';
import { Todo, TodoActions, Priority } from '../types';

interface TodoItemProps extends TodoActions {
  todo: Todo;
  isMobile?: boolean;
}

// 우선순위에 따른 색상 정의
const priorityColors = {
  [Priority.HIGH]: {
    bg: '#ffd6d6',
    text: '#d32f2f',
    label: '높음'
  },
  [Priority.MEDIUM]: {
    bg: '#fff4c8',
    text: '#ed6c02',
    label: '중간'
  },
  [Priority.LOW]: {
    bg: '#e8f5e9',
    text: '#2e7d32',
    label: '낮음'
  }
};

const PrioritySelect = memo(({ priority, onChange }: { 
  priority: Priority, 
  onChange: (priority: Priority) => void 
}) => (
  <FormControl size="small" sx={{ minWidth: 100, ml: 1 }}>
    <Select
      value={priority}
      onChange={(e: SelectChangeEvent) => onChange(e.target.value as Priority)}
      displayEmpty
      variant="outlined"
      size="small"
      sx={{ 
        '.MuiSelect-select': { 
          py: 0.5, 
          display: 'flex', 
          alignItems: 'center',
          color: priorityColors[priority].text 
        }
      }}
    >
      <MenuItem value={Priority.HIGH}>
        <Chip 
          icon={<FlagIcon />} 
          label="높음" 
          size="small"
          color="error"
          sx={{ backgroundColor: priorityColors[Priority.HIGH].bg }}
        />
      </MenuItem>
      <MenuItem value={Priority.MEDIUM}>
        <Chip 
          icon={<FlagIcon />} 
          label="중간" 
          size="small"
          color="warning"
          sx={{ backgroundColor: priorityColors[Priority.MEDIUM].bg }}
        />
      </MenuItem>
      <MenuItem value={Priority.LOW}>
        <Chip 
          icon={<FlagIcon />} 
          label="낮음" 
          size="small"
          color="success"
          sx={{ backgroundColor: priorityColors[Priority.LOW].bg }}
        />
      </MenuItem>
    </Select>
  </FormControl>
));

const EditMode = memo(({ 
  editText, 
  setEditText, 
  handleSaveEdit, 
  handleCancelEdit,
  isMobile 
}: {
  editText: string;
  setEditText: (text: string) => void;
  handleSaveEdit: () => void;
  handleCancelEdit: () => void;
  isMobile?: boolean;
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1, p: isMobile ? 1 : 2 }}>
    <TextField
      fullWidth
      value={editText}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSaveEdit()}
      autoFocus
      size="small"
      sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
    />
    <IconButton onClick={handleSaveEdit} color="primary" size={isMobile ? "small" : "medium"}>
      <SaveIcon fontSize={isMobile ? "small" : "medium"} />
    </IconButton>
    <IconButton onClick={handleCancelEdit} color="error" size={isMobile ? "small" : "medium"}>
      <CancelIcon fontSize={isMobile ? "small" : "medium"} />
    </IconButton>
  </Box>
));

const ViewMode = memo(({ 
  todo, 
  onToggle, 
  onDelete, 
  onChangePriority,
  handleStartEdit,
  isMobile
}: {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onChangePriority: (id: number, priority: Priority) => void;
  handleStartEdit: () => void;
  isMobile?: boolean;
}) => (
  <>
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      width: 'calc(100% - 120px)',
      pl: isMobile ? 1 : 2,
      pr: isMobile ? 8 : 2,
      py: isMobile ? 1 : 1.5
    }}>
      <Box flexGrow={1}>
        <ListItemText
          primary={todo.text}
          secondary={new Date(todo.createdAt).toLocaleString()}
          primaryTypographyProps={{ 
            fontSize: isMobile ? '0.9rem' : '1rem',
            fontWeight: todo.priority === Priority.HIGH ? 'bold' : 'normal'
          }}
          secondaryTypographyProps={{ 
            fontSize: isMobile ? '0.75rem' : '0.8rem' 
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: isMobile ? 2 : 3 }}>
        <Tooltip title="우선순위 변경">
          <Chip 
            icon={<FlagIcon fontSize={isMobile ? "small" : "medium"} />} 
            label={priorityColors[todo.priority].label} 
            size="small"
            sx={{ 
              backgroundColor: priorityColors[todo.priority].bg,
              color: priorityColors[todo.priority].text,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: isMobile ? '0.7rem' : '0.8rem',
              height: isMobile ? 24 : 32,
              '& .MuiChip-label': {
                padding: isMobile ? '0 6px' : '0 8px'
              },
              '&:hover': {
                opacity: 0.8
              }
            }}
            onClick={() => {
              // 클릭할 때마다 우선순위 순환: 높음 -> 중간 -> 낮음 -> 높음
              const nextPriority = {
                [Priority.HIGH]: Priority.MEDIUM,
                [Priority.MEDIUM]: Priority.LOW,
                [Priority.LOW]: Priority.HIGH
              }[todo.priority];
              onChangePriority(todo.id, nextPriority);
            }}
          />
        </Tooltip>
      </Box>
    </Box>
    <ListItemSecondaryAction sx={{ 
      right: isMobile ? 4 : 8, 
      display: 'flex', 
      gap: isMobile ? 0.5 : 1
    }}>
      <IconButton
        onClick={() => onToggle(todo.id)}
        color={todo.completed ? 'success' : 'default'}
        size={isMobile ? "small" : "medium"}
        sx={{ mx: isMobile ? 0.25 : 0.5 }}
      >
        <CheckIcon fontSize={isMobile ? "small" : "medium"} />
      </IconButton>
      <IconButton
        onClick={handleStartEdit}
        color="primary"
        size={isMobile ? "small" : "medium"}
        sx={{ mx: isMobile ? 0.25 : 0.5 }}
      >
        <EditIcon fontSize={isMobile ? "small" : "medium"} />
      </IconButton>
      <IconButton
        onClick={() => onDelete(todo.id)}
        color="error"
        size={isMobile ? "small" : "medium"}
        sx={{ mx: isMobile ? 0.25 : 0.5 }}
      >
        <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
      </IconButton>
    </ListItemSecondaryAction>
  </>
));

const TodoItem = memo(({ todo, onToggle, onDelete, onEdit, onChangePriority, isMobile = false }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleSaveEdit = () => {
    if (editText.trim() && editText.trim() !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  return (
    <ListItem
      sx={{
        backgroundColor: 'white',
        marginBottom: 1,
        borderRadius: 1,
        textDecoration: todo.completed ? 'line-through' : 'none',
        opacity: todo.completed ? 0.7 : 1,
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        p: 0
      }}
    >
      {isEditing ? (
        <EditMode
          editText={editText}
          setEditText={setEditText}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
          isMobile={isMobile}
        />
      ) : (
        <ViewMode
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onChangePriority={onChangePriority}
          handleStartEdit={handleStartEdit}
          isMobile={isMobile}
        />
      )}
    </ListItem>
  );
});

export default TodoItem; 