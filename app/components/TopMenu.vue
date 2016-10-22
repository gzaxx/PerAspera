<template>
    <div class="ui stackable menu">
        <div class="ui container">
            <a class="item" @click='showCurrent'>
                <i class="home icon"></i> Current
            </a>
            <a class="item" @click='showHistory()'>
                <i class="calendar icon"></i> History
            </a>
            <!--<a class="item">
                <i class="settings icon"></i> Opcje
            </a>               -->
        </div>
    </div>
</template>

<script>
    import bus from '../../app/core/eventBus.js'

    export default {
        methods: {
            showCurrent() {
                bus.emit('view-change', 'Current')
            },
            showHistory() {
                bus.emit('view-change', 'History')
            }
        }
    }
</script>