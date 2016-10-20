<template>
    <div class="ui container">
        <div class="ui horizontal divider"><i class="settings icon"></i> SETTIGNS</div>        
        <form class="ui form segment">
            <div class="ui horizontal divider">INCOME</div>

            <div class="field">            
                <label for="income">Monthly income</label>
                <input id="income" placeholder="2100.00 PLN" v-model="settings.income" type="text" >
            </div>

            <div class="field">
                <div class="ui toggle checkbox">
                    <input type="checkbox" v-model="settings.incomeTaxIncluded" >
                    <label>TAX included</label>
                </div>
            </div>

            <div class="ui horizontal divider">TAXES</div>

            <div class="fields">
                <div class="five wide field">
                    <label for='socialTax'>Social</label>
                    <input name="socialTax" placeholder="700 PLN" type="text" v-model="settings.socialTax">
                </div>
                <div class="six wide field">
                    <label for='healthTax'>Health</label>
                    <input name="healthTax" placeholder="700 PLN" type="text" v-model="settings.healthTax">
                </div>
                <div class="five wide field">
                    <label for='workFund'>Work fund</label>
                    <input name="workFund" placeholder="700 PLN" type="text" v-model="settings.workFund">
                </div>
            </div>


            <div class="ui primary button" @click='save()'>Save</div>            
        </form>
    </div>
</template>

<script>
    import config from '../../app/core/config.js'
    import bus from '../../app/core/eventBus.js'

    var rules = {
        inline : true,
        fields: {
            income: {
                identifier: 'income',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please provide monthly income'
                    },
                    {
                        type: 'decimal',
                        prompt: 'Monthly income must be a number'
                    }
                ]
            },
            socialTax: {
                identifier: 'socialTax',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please provide social tax'
                    },
                    {
                        type: 'decimal',
                        prompt: 'Social tax must be a number'
                    }
                ]
            },
            healthTax: {
                identifier: 'healthTax',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please provide health tax'
                    },
                    {
                        type: 'decimal',
                        prompt: 'Health tax must be a number'
                    }
                ]
            },
            workFund: {
                identifier: 'workFund',
                rules: [
                    {
                        type: 'decimal',
                        prompt: 'Work fund must be a number'
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
    };

    export default {
        data() {
            return {
                cssDisabled: '',
                settings: {
                    income: 0,
                    incomeTaxIncluded: false,
                    socialTax: 0,
                    healthTax: 0,
                    workFund: 0
                }
            }
        },

        created() {                        
            if (config.configurationExists()) {
                this.settings = config.readConfig();                          
            } else {
                this.cssDisabled = 'disabled'
            }           
        },

        mounted() {            
            //setFormValidation()
        },

        methods: {
            save() {                
                //if ($('.ui.form').form('validate form')) {                    
                    config.saveConfigFile(this.settings)
                    bus.emit('view-change', 'Current')
                //}
            }
        }
    }


</script>