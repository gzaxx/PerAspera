<template>
    <div class="my-container">

        <div class="my-centered">
        <div class="ui center aligned grid">
            <div class="eight column wide">
                <h2 class="ui icon header">
                    <i class="money icon"></i>
                    <div class="content">
                        PerAspera
                        <div class="sub header">Manage your overhour income.</div>
                    </div>
                </h2>
            </div>
        </div>

        <div class="ui middle aligned grid">
            <div class="eight column wide">
                <div class="ui teal progress" id="start">
                    <div class="bar">
                        <div class="progress"></div>
                    </div>
                    <div class="label">{{ step }}</div>
                </div>            
            </div>
        </div>

        </div>
    </div>    
</template>

<script>
    import bus from '../../app/core/eventBus.js'

    export default {

        data() {
            return {
                step: 'LOADING CONFIGURATION'                
            }
        },

        created() {
            bus.on('progress-set', this.setProgress)
        },

        mounted() {
            $('#start').progress({                
                total: 2
            });
        },

        methods: {
            update() {          
                $('#start').progress('increment')
            },

            setProgress (step) {
                if (step) {
                    this.step = step
                }
                
                this.update()
            }
        }

    }

</script>