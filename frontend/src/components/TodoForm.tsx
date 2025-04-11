import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  FormControl, 
  Select, 
  MenuItem, 
  InputLabel, 
  SelectChangeEvent,
  Chip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { FlagRounded as FlagIcon } from '@mui/icons-material';
import { Priority } from '../types';

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

interface TodoFormProps {
  onAdd: (text: string, priority: Priority) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), priority);
      setText('');
    }
  };

  const handlePriorityChange = (e: SelectChangeEvent) => {
    setPriority(e.target.value as Priority);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box 
        display="flex" 
        flexDirection={isMobile ? "column" : "row"} 
        alignItems={isMobile ? "stretch" : "flex-start"} 
        gap={isMobile ? 1 : 1}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="할일 추가"
          value={text}
          onChange={(e) => setText(e.target.value)}
          size={isMobile ? "small" : "medium"}
          sx={{ 
            fontSize: isMobile ? '0.9rem' : '1rem',
            flex: 1
          }}
        />
        <Box 
          display="flex" 
          gap={1} 
          width={isMobile ? "100%" : "auto"}
          justifyContent={isMobile ? "space-between" : "flex-start"}
        >
          <FormControl 
            variant="outlined" 
            size={isMobile ? "small" : "medium"} 
            sx={{ 
              minWidth: isMobile ? 0 : 120,
              flex: isMobile ? 1 : 'none'
            }}
          >
            <InputLabel id="priority-select-label">우선순위</InputLabel>
            <Select
              labelId="priority-select-label"
              value={priority}
              onChange={handlePriorityChange}
              label="우선순위"
              sx={{
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  padding: isMobile ? '8px 14px' : '14px 16px'
                }
              }}
            >
              <MenuItem value={Priority.HIGH}>
                <Chip 
                  icon={<FlagIcon fontSize={isMobile ? "small" : "medium"} />} 
                  label="높음" 
                  size="small"
                  color="error"
                  sx={{ 
                    backgroundColor: priorityColors[Priority.HIGH].bg,
                    color: priorityColors[Priority.HIGH].text,
                    fontSize: isMobile ? '0.7rem' : '0.8rem',
                    height: isMobile ? 24 : 32,
                    fontWeight: 'bold'
                  }}
                />
              </MenuItem>
              <MenuItem value={Priority.MEDIUM}>
                <Chip 
                  icon={<FlagIcon fontSize={isMobile ? "small" : "medium"} />} 
                  label="중간" 
                  size="small"
                  color="warning"
                  sx={{ 
                    backgroundColor: priorityColors[Priority.MEDIUM].bg,
                    color: priorityColors[Priority.MEDIUM].text,
                    fontSize: isMobile ? '0.7rem' : '0.8rem',
                    height: isMobile ? 24 : 32,
                    fontWeight: 'bold'
                  }}
                />
              </MenuItem>
              <MenuItem value={Priority.LOW}>
                <Chip 
                  icon={<FlagIcon fontSize={isMobile ? "small" : "medium"} />} 
                  label="낮음" 
                  size="small"
                  color="success"
                  sx={{ 
                    backgroundColor: priorityColors[Priority.LOW].bg,
                    color: priorityColors[Priority.LOW].text,
                    fontSize: isMobile ? '0.7rem' : '0.8rem',
                    height: isMobile ? 24 : 32,
                    fontWeight: 'bold'
                  }}
                />
              </MenuItem>
            </Select>
          </FormControl>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            size={isMobile ? "small" : "medium"}
            sx={{ 
              minWidth: isMobile ? 0 : 'auto',
              px: isMobile ? 3 : 4,
              py: isMobile ? 0.9 : 1.1,
              whiteSpace: 'nowrap'
            }}
          >
            추가
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default TodoForm; 