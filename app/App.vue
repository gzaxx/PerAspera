<template>
    <div id="app">
        <top-menu v-show="showTopeMenu"></top-menu>
        <component :is="currentView" transition="fade" transition-mode="out-in"></component>
    </div>
</template>

<script>
    import Config from './components/Config.vue'
    import History from './components/History.vue'
    import TopMenu from './components/TopMenu.vue'
    import Current from './components/Current.vue'    
    import Welcome from './components/Welcome.vue'        
    import config from './core/config.js'
    import bus from './core/eventBus.js'

    export default {
        components: {
            Welcome, 
            Current,
            Config,
            TopMenu,
            History
        },
        data() {
            return {
                currentView: Welcome,
                views: {
                    'Welcome': Welcome, 
                    'Current': Current,
                    'Config': Config,
                    'History': History
                },
                showTopeMenu: false
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
            bus.on('toggle-top-menu', this.toggleTopMenu)
        },
        methods: {
            viewChange(name) {
                var view = this.views[name]
                if (view) {
                    this.currentView = view
                }
            },
            toggleTopMenu(visible) {
                this.showTopeMenu = visible
            }
        }
    }
</script>
