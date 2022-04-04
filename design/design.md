# Design Document



###### Initial Design Sketches

We started the design process by sketching out what a potential mobile to do list application would look like. Our preliminary sketches are shown in the design folder.

We paid special attention to the alighnment of the items to make sure that our app is compliant with the design principles taught by Dr. Millburn.

in following with these principles we decided to left align all the items on the desired margin that we picked. In this way, all of our items are aligned on the left hand side, but with enough padding to not make the app feel cluttered.


While designing this app, we used 3 adjectives that we hoped would describe our app.
1. Vibrant
2. Natural
3. Encouraging

After choosing these adjectives, we settled on the sunset background as we thought it would appeal to users and increase productivity (a main goal of this app for users)

We also decided to add the time to the top so that users could easily tell how much time they have left to finish their tasks.

We are the most proud of the clear buttons that we added in order to keep the natural feel from the sunset.

Overall, we made design choices in order to help increase the productivity of our users and create a vibrant, natural, and encouraging feel.

###### Updates to the Design

We had multiple friends breifly test the app to see their preferences on the following: 

1. Whether they prefered editing each task inline or using the modal. 
2. How they felt about being able to click on a task to complete it

It became clear that clicking on a task to toggle its completion was a desired functionality, so we opted for that along with the modal to edit tasks.

When testing to make sure the features worked as desired, we tested the features as we added them. We came up with many edge cases to test for. We tested for when an already completed task was clicked. We wanted this to make the task incomplete, however it wasn't performing this action. So we wrote a new toggleComplete function to handle this functionality. 

We then tested to make sure that the completion still worked as desired when the tasks were initially marked as completed. It did not so we revised how the state was changed.


We also tested the edit functionality. We found that when the field was edited to have no name, the task still remained. This functionality is actually desired since they can now edit the name again. We only want the deletion of items to occur when the trash button is pressed. We also tested the modal to make sure that when the area outside of the popup was pressed, the buttons beneath the area did not still have functionality.

We decided to break the UI into different components in order to better keep track of and develop the app and make reusability easier. We decided to create components for the App, Header, Task, TaskList, TaskAdder, TaskEditor, and ToggleBar. Each of these components represent a vital portion on the application that performs a certain task.

We started with less components, but found that we needed more components in order to get the full funtionality. Our first iterations had only the Task and TaskList components. In this iteration we tried to use buttons and input fields only to create the desired functionality, but we quickly found that it was too hard to get the desired values without passing values through props of components. 

We had the most challenges when creating the edit feature and implementing the modal.
We are the most proud of the edit feature that implements a modal.


##### Lab 3 Design

For lab 3, we did not need to change much in terms of design. However, we still needed to make some design decisions and do user testing. 

For our current design, we needed to add a way to create a way for the user to set and change the priority of a given task. To do this, we decided to add a new button to the task bar that would trigger a pop up for changing the priority.

We started by adding the priority change feature to the same pop up as the task editor, but after talking to a few users while user testing they found that this was confusing. Instead, we decided to add a new separate button on each task to change the priority of the task.

We decided to signify that green meant the task was low priority and that red would signify high priority. We decided this after asking test users what colors they thought were most intuitive to go with high and low priority tasks. We also decided that completed tasks should have no priority since they are already done.


#### Lab 4 Design

Extensive thought went into whether or not we wanted to do a drop-down menu to navigate between tasks, or have a homepage with multiple task lists, 