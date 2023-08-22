import  { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const departmentData = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const SecondPageComponent2 = () => {
  const [openSubDepartments, setOpenSubDepartments] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const handleToggleSubDepartment = (department: string) => {
    if (openSubDepartments.includes(department)) {
      setOpenSubDepartments(openSubDepartments.filter((dep) => dep !== department));
    } else {
      setOpenSubDepartments([...openSubDepartments, department]);
    }
  };

  const handleSubDepartmentCheckboxToggle = (subDept: string) => {
    if (selectedSubDepartments.includes(subDept)) {
      setSelectedSubDepartments(selectedSubDepartments.filter((dept) => dept !== subDept));
    } else {
      setSelectedSubDepartments([...selectedSubDepartments, subDept]);
    }
  };

  const handleDepartmentCheckboxToggle = (dept: string) => {
    if (selectedDepartments.includes(dept)) {
      setSelectedDepartments(selectedDepartments.filter((department) => department !== dept));
      const subDepartments = departmentData.find((d) => d.department === dept)?.sub_departments || [];
      setSelectedSubDepartments(
        selectedSubDepartments.filter((subDept) => !subDepartments.includes(subDept))
      );
    } else {
      setSelectedDepartments([...selectedDepartments, dept]);
      const subDepartments = departmentData.find((d) => d.department === dept)?.sub_departments || [];
      setSelectedSubDepartments([...selectedSubDepartments, ...subDepartments]);
    }
  };

  return (
    <div>
      <List>
        {departmentData.map((dept) => (
          <div key={dept.department}>
            <ListItem>
              <Checkbox
                checked={selectedDepartments.includes(dept.department)}
                onChange={() => handleDepartmentCheckboxToggle(dept.department)}
              />
              <ListItemText primary={dept.department.replace("_", " ")} />
              <IconButton
                onClick={() => handleToggleSubDepartment(dept.department)}
                aria-label="Toggle SubDepartments"
              >
                {openSubDepartments.includes(dept.department) ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
            </ListItem>
            <Collapse in={openSubDepartments.includes(dept.department)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {dept.sub_departments.map((subDept) => (
                  <ListItem key={subDept} sx={{ paddingLeft: 4 }}>
                    <Checkbox
                      checked={selectedSubDepartments.includes(subDept)}
                      onChange={() => handleSubDepartmentCheckboxToggle(subDept)}
                    />
                    <ListItemText primary={subDept.replace("_", " ")} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  );
};

export default SecondPageComponent2;
