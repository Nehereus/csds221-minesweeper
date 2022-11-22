<template>
    <v-card>
        <v-toolbar v-if="isEditing"  color="primary" dark> <i class="fas fa-edit"></i>&nbsp Edit Task</v-toolbar>
        <v-toolbar v-else color="primary" dark> <i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp Add Task</v-toolbar>
        <v-card-text>
            <v-form ref="form"  lazy-validation>
                <v-text-field v-if="!isEditing" v-model="title" :rules="[dialogRules.required, dialogRules.distinct]" label="Title"
                    placeholder=" Title" @input="$emit('titleChanged', title)" required>
                </v-text-field>
                <v-text-field v-model="description" :rules="[dialogRules.required,]" label="Description"
                    placeholder="Description" required>
                </v-text-field>
        

                <v-menu v-model="dateMenu" :close-on-content-click="true" :nudge-right="40"
                    transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dateFormatted" label="Deadline" prepend-inner-icon="mdi-calendar"
                            readonly v-bind="attrs" v-on="on" @blur="deadline = parseDate(dateFormatted)">
                        </v-text-field>
                       
                    </template>
                    <v-date-picker v-model="deadline" no-title @input="dateMenu = false">
                    </v-date-picker>
                </v-menu>
               
                <v-radio-group v-model="priority" label="Priority" row>
                    <v-radio name="priority" label="Low" color="blue" value="low"></v-radio>
                    <v-radio name="priority" label="Mid" color="blue" value="mid"></v-radio>
                    <v-radio name="priority" label="High" color="blue" value="high"></v-radio>
                </v-radio-group>
                 </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
            <v-btn v-if="!isEditing" color="primary" @click="handleSubmit"><i class="fa fa-plus-circle"
                    aria-hidden="true"></i> &nbsp ADD
            </v-btn>
            <v-btn v-else  color="primary" @click="handleUpdate"><i class="fa fa-edit"
                    aria-hidden="true"></i> &nbsp update
            </v-btn>
            <v-btn type="close" color="error" @click="handleCancel">
                <i class="fa-solid fa-ban"></i>
                 &nbsp CANCEL
            </v-btn>
        </v-card-actions>
    </v-card>



</template>


<script>
//master
export default {
    //life cycles
    created() { 
        this.$forceUpdate();
    },
    //methods
    props: {
        isDistinct: {
            type: Boolean,
        },
        isEditing: {
            type: Boolean,
        },
        editingDescription: {
            type: String,
        },
        editingDeadline:{

        },
        editingPriority: {
            type: String
        }
    },
    methods: {
        handleUpdate(){
            if (this.$refs.form.validate()) {
                this.$emit('dialogUpdated',  this.description, this.dateFormatted, this.priority);
                this.$refs.form.reset();
            }
        },
        handleCancel(){

            this.$emit('closeDialog');
        },
        handleSubmit() {
            if (this.$refs.form.validate()) {
                this.$emit('dialogSubmitted', this.title, this.description, this.dateFormatted, this.priority);
                this.$refs.form.reset();

            }
        },
        formatDate(date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        },
        parseDate(date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
    },
    //watchers
    watch: {
        deadline(val) {
            this.dateFormatted = this.formatDate(this.deadline);
        },
        isEditing: function(newVal){
            this.isEditing=newVal;
        },

        editingDescription: function(newVal){
            this.description=newVal;
        },

        editingDeadline: function(newVal){
            this.dateFormatted=newVal;
        },

        editingPriority: function(newVal){
            this.priority=newVal;
        },

        priority: function(newVal,oldVal){
            console.log(newVal+":"+oldVal);
        },
        dateFormatted: function(newVal,oldVal){
            console.log(newVal+":"+oldVal);
        },
        description: function(newVal,oldVal){
            console.log(newVal+":"+oldVal);
        }
    },
    //computed
    computed: {
    },
    //global vars
    data() {
        return {
            deadline: this.editingDeadline,
            dateFormatted: this.editingDeadline,
            description: this.editingDescription,
            title: null,
            dateMenu: null,
            form: null,
            priority: this.editingPriority,

            dialogRules: {
                required: val => !!val || 'this field must be non-empty.',
                distinct: val => this.isDistinct || 'the title need to be distinct for each task'
            }
        }
    },
}
</script>