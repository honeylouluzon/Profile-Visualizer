# BEHAVE
<!--
Pre-BEHAVE.md Steps:  
STEP 1. Add additional task at TASK.md with series # followed by [TODO] before puting the instruction of your task  
(Example: 1. [TODO] Execute the content of the BEHAVE.MD)  
Step 2. Write a prompt in the github copilot instructing to perform the BEHAVE.md followed by the number of task at the TASK.md that you want to perform  
(Sample Prompt: "Execute the BEHAVE.md. ChosenTask = 1")  
-->
**Instruction**: Perform all the steps one by one from STEP 1 to STEP 4

**STEP 1**: Update the status of the Task #<ChosenTask> of TASK.md from [TODO] to [PROCESSING]  
**STEP 2**: Execute the Instructions under the Task #<ChosenTask> of TASK.md without altering the existing code not unless to change is mentioned in the task to perform. Do not perform unrelated action from the task. Ask clarification if don't know exactly what to do for you not to create undesired result. 
**STEP 3**: Update the status of Task #<ChosenTask> in TASK.md from [PROCESSING] TO [DONE]  
**STEP 4**: Run git add . && git commit with -m as the changes or action taken or the Task #<ChosenTask> of TASK.md instruction && git push to sync the Changes to the Github Repository.