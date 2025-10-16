import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Avatar,
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton
} from '@mui/material';
import { IconUser, IconCalendar, IconBriefcase, IconClock, IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import PageContainer from '../../../../modernize-dashboard/src/components/container/PageContainer';

const HRMain = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Alice Johnson', position: 'Software Engineer', department: 'IT', status: 'Active', joinDate: '2023-01-15', salary: 75000 },
    { id: 2, name: 'Bob Smith', position: 'Marketing Manager', department: 'Marketing', status: 'Active', joinDate: '2022-08-20', salary: 65000 },
    { id: 3, name: 'Carol Davis', position: 'HR Specialist', department: 'HR', status: 'On Leave', joinDate: '2023-03-10', salary: 55000 },
    { id: 4, name: 'David Wilson', position: 'Sales Representative', department: 'Sales', status: 'Active', joinDate: '2023-06-01', salary: 50000 }
  ]);

  const [open, setOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [formData, setFormData] = useState({ name: '', position: '', department: '', status: 'Active', salary: 0 });

  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const totalPayroll = employees.reduce((sum, e) => sum + e.salary, 0);
  const avgSalary = Math.round(totalPayroll / employees.length);

  const handleAdd = () => {
    setEditEmployee(null);
    setFormData({ name: '', position: '', department: '', status: 'Active', salary: 0 });
    setOpen(true);
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setFormData(employee);
    setOpen(true);
  };

  const handleSave = () => {
    const newEmployee = { ...formData, joinDate: new Date().toISOString().split('T')[0] };
    
    if (editEmployee) {
      setEmployees(employees.map(e => e.id === editEmployee.id ? { ...newEmployee, id: editEmployee.id, joinDate: editEmployee.joinDate } : e));
    } else {
      setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  return (
    <PageContainer title="HR" description="Human Resources Management">
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">HR Dashboard</Typography>
          <Button variant="contained" startIcon={<IconPlus />} onClick={handleAdd}>
            Add Employee
          </Button>
        </Box>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: '#f8f9ff',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: '#e8eaff',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: '#5a67d8' }}>👥</Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    {employees.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    Total Employees
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: '#f0fff4',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: '#c6f6d5',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: '#38a169' }}>✅</Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    {activeEmployees}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    Active Employees
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: '#fffbf0',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: '#fed7aa',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: '#d69e2e' }}>💰</Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    ₹{totalPayroll.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    Total Payroll
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: '#fff5f5',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: '#fed7d7',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: '#e53e3e' }}>📊</Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    ₹{avgSalary.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    Avg Salary
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>Employee Directory</Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Employee</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Position</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Join Date</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Salary</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee, index) => (
                    <TableRow key={employee.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' }, '&:hover': { backgroundColor: 'action.selected' } }}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>{employee.name.charAt(0)}</Avatar>
                          <Typography sx={{ fontWeight: 'medium' }}>{employee.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{employee.position}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{employee.department}</TableCell>
                      <TableCell>
                        <Chip 
                          label={employee.status} 
                          color={employee.status === 'Active' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{employee.joinDate}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'success.main' }}>₹{employee.salary.toLocaleString()}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(employee)} size="small">
                          <IconEdit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(employee.id)} size="small" color="error">
                          <IconTrash />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editEmployee ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Position"
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              margin="normal"
              SelectProps={{ native: true }}
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </TextField>
            <TextField
              fullWidth
              label="Salary"
              type="number"
              value={formData.salary}
              onChange={(e) => setFormData({...formData, salary: parseFloat(e.target.value) || 0})}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default HRMain;