
<!-- for animation it is not necessary just for fun -->

<template>
    <v-app style='margin:30px'>
        <v-card>
            <!--panel header-->
            <v-card-title class='text-right primary' primary-title style='color: white;'>
                <v-col>
                    Framework
                </v-col>
                <v-col class="text-right">
                    <v-dialog transition="dialog-bottom-transition" content-class="my-custom-dialog"
                        v-model="showAddDialog">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" v-bind="attrs" v-on="on"
                                @click="changeEditingValue(false, null, null, null)">
                                <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                &nbsp Add
                            </v-btn>
                        </template>
                        <template v-slot:default="dialog">
                            <myDialog @dialogSubmitted="dialogSubmissionCallback" @titleChanged="titleIsDistinct"
                                @closeDialog="closeDialog" :isDistinct="isDistinct" :isEditing="isEditing"
                                :editingDescription="editingDescription" :editingDeadline="editingDeadline"
                                :editingPriority="editingPriority">
                            </myDialog>
                        </template>
                    </v-dialog>

                </v-col>
            </v-card-title>
            <!--panel body-->
            <v-simple-table style='margin: 20px;'>
                <template v-slot:default>
                    <!--table header-->
                    <thead>
                        <tr>
                            <th>
                                Title
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Deadline
                            </th>
                            <th>
                                Priority
                            </th>
                            <th>
                                is Complete
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <!--table body-->
                    <tbody>
                        <tr v-for="(task, index) in tasks" :key="index">
                            <td>{{ task.title }}</td>
                            <td>{{ task.description }}</td>
                            <td>{{ task.date }}</td>
                            <td>{{ task.priority }}</td>
                            <td>
                                <v-checkbox v-model="task.isComplete"></v-checkbox>
                            </td>
                            <td>
                                <v-dialog transition="dialog-bottom-transition" content-class="my-custom-dialog"
                                    v-model="showEditDialog">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" v-on="on" max-width="30" max-height="30" color="primary"
                                            @click="changeEditingValue(true, task.description, task.date, task.priority)"
                                            v-show="!task.isComplete">
                                            Update</v-btn>
                                    </template>
                                    <template v-slot:default="dialog">
                                        <myDialog @dialogSubmitted="dialogSubmissionCallback"
                                            @titleChanged="titleIsDistinct" @closeDialog="closeDialog"
                                            @dialogUpdated="dialogUpdateCallback(index, ...arguments)"
                                            :isDistinct="isDistinct" :isEditing="isEditing"
                                            :editingDescription="editingDescription" :editingDeadline="editingDeadline"
                                            :editingPriority="editingPriority">
                                        </myDialog>

                                    </template>

                                </v-dialog>

                                <v-btn max-width="30" max-height="30" color="error" @click="tubleDeleteCallback(index)">
                                    delete</v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>
    </v-app>
</template>


<script>
//master
import myDialog from './myDialog.vue'
export default {
    components: {
        myDialog
    },
    //life cycles
    created() { },
    //methods
    methods: {
        dialogUpdateCallback(index, description, dateFormatted, priority) {
            let toast = this.$toasted.success("the task was updated successfully", {
                theme: "toasted-primary",
                duration: 3000
            });
            this.tasks[index].description = description;
            this.tasks[index].date = dateFormatted;
            this.tasks[index].priority = priority;
            this.showEditDialog = false;
            this.showAddDialog = false;
        },


        changeEditingValue(isEditing, description, date, priority) {
            this.isEditing = isEditing;
            this.editingDescription = description;
            this.editingDeadline = date;
            this.editingPriority = priority;

        },

        closeDialog() {
            this.showDialog = false;
            this.showEditDialog = false;
            this.showAddDialog = false;

        },

        dialogSubmissionCallback(title, description, dateFormatted, priority) {
            let toast = this.$toasted.success("the task was added successfully", {
                theme: "toasted-primary",
                duration: 3000
            });
            this.tasks.push({ "title": title, "description": description, "date": dateFormatted, "priority": priority, "isComplete": false, })
            this.showEditDialog = false;
            this.showAddDialog = false;


        },

        tubleDeleteCallback(index) {
            this.tasks.splice(index, 1);
            let toast = this.$toasted.success("the task was deleted successfully", {
                theme: "toasted-primary",
                duration: 3000
            });
        },
        titleIsDistinct(currTitle) {
            this.isDistinct = true;
            for (var i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].title == currTitle) {
                    this.isDistinct = false;
                    break;
                }
            }
        },
    },
    //watchers
    watch: {

    },
    //computed
    computed: {

    },
    //global vars
    data() {
        return {
            editingDeadline: null,
            editingDescription: null,
            editingPriority: null,
            isEditing: false,
            showDialog: false,
            showEditDialog: false,
            showAddDialog: false,
            isDistinct: true,
            tasks: [],
        }
    },
}
</script>