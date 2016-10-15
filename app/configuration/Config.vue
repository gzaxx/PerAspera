<template>
    <div>
        <div class="ui horizontal divider">SETTINGS</div>
        <form class="ui form segment">
            <div class="field">
                <label for="Firebase">Surname</label>
                <input id="firebase" placeholder="my.firebaseIO.com" v-model="firebaseUrl" type="text" >
            </div>

            <div class="ui primary button" @click='save()'>Submit</div>            
        </form>
    </div>
</template>

<script>
    import config from './config.js'

    var rules = {
        inline : true,
        fields: {
            firebase: {
                identifier: 'firebase',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter firebase url'
                    }
                ]
            }
        }
    }

    function setFormValidation() {
        $('.ui.form').form(rules, {
            onSuccess: function () {
                console.log('okish');
            },
            onFailure: function() {
                console.log('failed x2');
            }
        });
    }

    setFormValidation()

    export default {
        data() {
            return {
                cssDisabled: '',
                firebaseUrl: ''
            }
        },

        created() {                        
            if (config.configurationExists()) {
                var cfg = config.readConfig();
                this.firebaseUrl = cfg.firebaseUrl;
            } else {
                this.cssDisabled = 'disabled'
            }           
        },

        mounted() {
            console.log('go')

            setFormValidation()
        },

        methods: {
            save() {                
                $('.ui.form').form('validate form');
                console.log('save clicked')

                var cfg = {
                    firebaseUrl: this.firebaseUrl
                }

                config.saveConfigFile(cfg)
            }
        }
    }


</script>