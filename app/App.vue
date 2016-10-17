<template>
    <div id="app">
        <component :is="currentView" transition="fade" transition-mode="out-in"></component>
    </div>
</template>

<script>
    import Config from './configuration/Config.vue'
    import TopMenu from './components/TopMenu.vue'
    import Current from './components/Current.vue'    
    import Welcome from './components/Welcome.vue'        
    import config from './configuration/config.js'
    import bus from './core/eventBus.js'

    export default {
        components: {
            Welcome, 
            Current,
            Config
        },
        data() {
            return {
                currentView: Welcome,
                views: {
                    'Welcome': Welcome, 
                    'Current': Current,
                    'Config': Config
                }
            }
        },
        mounted() {
            bus.emit('progress-set')

            const self = this

            setTimeout(function() {                
                bus.emit('progress-set', 'ALMOST DONE')

                setTimeout(function() {
                    if (config.configurationExists()) {
                        self.currentView = Current
                    } else {
                        self.currentView = Config
                }}, 400)
            }, 1000)

            bus.on('view-change', this.viewChange)
        },
        methods: {
            viewChange(name) {
                var view = this.views[name]
                if (view) {
                    this.currentView = view
                }
            }
        }
    }
</script>
