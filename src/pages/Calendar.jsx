import React, { useState } from 'react';
import { 
  ScheduleComponent, 
  ViewsDirective, 
  ViewDirective, 
  Day, 
  Week, 
  WorkWeek, 
  Month, 
  Agenda, 
  Inject, 
  Resize, 
  DragAndDrop 
} from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-react-schedule/styles/material.css';

import { scheduleData } from '../data/dummy';

const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Calendar = () => {
  const [scheduleObj, setScheduleObj] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    Subject: '',
    Location: '',
    StartTime: '',
    EndTime: '',
  });
  const [formError, setFormError] = useState('');

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const change = (args) => {
    if (scheduleObj) {
      scheduleObj.selectedDate = args.value;
      scheduleObj.dataBind();
    }
  };

  const onDragStart = (arg) => {
    arg.navigation.enable = true;
  };

  const addTask = () => {
    // Set default times for convenience
    const startTime = new Date();
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 1);
    
    setNewTask({
      Subject: '',
      Location: '',
      StartTime: formatDateForInput(startTime),
      EndTime: formatDateForInput(endTime),
    });
    
    setFormError('');
    setIsDialogOpen(true);
  };

  // Helper function to format dates for datetime-local input
  const formatDateForInput = (date) => {
    return date.toISOString().slice(0, 16);
  };

  const handleSave = () => {
    // Validate form
    if (!newTask.Subject) {
      setFormError('Subject is required');
      return;
    }
    
    if (!newTask.StartTime || !newTask.EndTime) {
      setFormError('Start and end time are required');
      return;
    }
    
    const startTime = new Date(newTask.StartTime);
    const endTime = new Date(newTask.EndTime);
    
    if (endTime <= startTime) {
      setFormError('End time must be after start time');
      return;
    }

    if (scheduleObj) {
      try {
        const newEvent = {
          Id: Math.floor(Math.random() * 1000) + scheduleData.length + 1, // Ensure unique ID
          Subject: newTask.Subject,
          Location: newTask.Location || 'N/A',
          StartTime: startTime,
          EndTime: endTime,
          CategoryColor: '#f57f17',
        };
        
        // Add event to scheduler
        scheduleObj.addEvent(newEvent);
        
        // Reset form and close dialog
        setIsDialogOpen(false);
        setNewTask({ Subject: '', Location: '', StartTime: '', EndTime: '' });
        setFormError('');
      } catch (error) {
        console.error("Error adding task:", error);
        setFormError('Error adding task. Please try again.');
      }
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFormError('');
  };

  return (
    <div className="container py-6">
      <div className="bg-white rounded-lg shadow-md p-6 relative">
        <div className="dashboard-header flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-gray-500">Welcome back to your dashboard.</p>
          </div>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addTask}>
            Add Task
          </Button>
        </div>

        <ScheduleComponent
          height="650px"
          ref={(schedule) => setScheduleObj(schedule)}
          selectedDate={new Date(currentYear, currentMonth, currentDay)}
          eventSettings={{ dataSource: scheduleData }}
          dragStart={onDragStart}
        >
          <ViewsDirective>
            {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => (
              <ViewDirective key={item} option={item} />
            ))}
          </ViewsDirective>
          <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
        </ScheduleComponent>

        <PropertyPane>
          <div className="mt-5 bg-white p-4 rounded-md shadow-sm">
            <div className="w-full">
              <DatePickerComponent
                value={new Date(currentYear, currentMonth, currentDay)}
                showClearButton={false}
                placeholder="Current Date"
                floatLabelType="Always"
                change={change}
              />
            </div>
          </div>
        </PropertyPane>
      </div>

      <DialogComponent 
        width="400px" 
        isModal={true} 
        visible={isDialogOpen} 
        header="Add Task" 
        close={handleCloseDialog}
      >
        <div className="p-4">
          {formError && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {formError}
            </div>
          )}
          <Input 
            type="text" 
            placeholder="Subject" 
            value={newTask.Subject} 
            onChange={(e) => setNewTask({ ...newTask, Subject: e.target.value })} 
            className="w-full mb-3"
          />
          <Input 
            type="text" 
            placeholder="Location" 
            value={newTask.Location} 
            onChange={(e) => setNewTask({ ...newTask, Location: e.target.value })} 
            className="w-full mb-3"
          />
          <Input 
            type="datetime-local" 
            placeholder="Start Time" 
            value={newTask.StartTime} 
            onChange={(e) => setNewTask({ ...newTask, StartTime: e.target.value })} 
            className="w-full mb-3"
          />
          <Input 
            type="datetime-local" 
            placeholder="End Time" 
            value={newTask.EndTime} 
            onChange={(e) => setNewTask({ ...newTask, EndTime: e.target.value })} 
            className="w-full mb-3"
          />
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={handleCloseDialog}
              className="px-4 py-2 rounded"
            >
              Cancel
            </Button>
            <Button 
              className="bg-green-500 text-white px-4 py-2 rounded" 
              onClick={handleSave}
            >
              Save Task
            </Button>
          </div>
        </div>
      </DialogComponent>
    </div>
  );
};

export default Calendar;