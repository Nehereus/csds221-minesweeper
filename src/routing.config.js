//imports
    import toDo from './toDo.vue';

//define routes
    export default [{
            path: '/toDo',
            name: 'toDo',
            component: toDo
        },{
            path: "*",
            name: 'default',
            redirect: "/toDo"
        }
    ];