<template>
    <div class="ui container my-container">
        <div class="ui two column middle aligned very relaxed stackable grid">
            <div class="column">
                <div class="ui form">
                    <p>
                        <div class="field">
                            <label>Work days in {{ month }}</label>
                            <div class="ui left icon input">
                                <input name="workDays" placeholder="22" type="text" v-model.number="data.workDays">
                                <i class="calendar icon"></i>
                            </div>
                        </div>
                    </p>

                    <p>
                        <div class="field">
                            <label>Overhours</label>
                            <div class="ui left icon disabled input">
                                <input name="overhours" placeholder="1000 PLN" type="text" v-model.number="data.overhours">
                                <i class="clock icon"></i>
                            </div>
                        </div>

                        <div class="ui blue submit button" @click='increase(1)'>+1</div>
                        <div class="ui blue submit button" @click='increase(0.5)'>+0.5</div>
                    </p>

                    <p>
                        <div class="field">
                            <label>Net payments</label>
                            <div class="ui left icon input">
                                <input name="netPayments" placeholder="1000 PLN" type="text"  v-model.number="data.netPayment">
                                <i class="dollar icon"></i>
                            </div>
                        </div>
                    </p>                    
                </div>

                <div class="ui blue submit button" @click='save()'>save</div>
                <div class="ui blue submit button" @click='toggleConfig(true)' v-show="!showConfig">settings</div>

                <config :isLocal="true" :savedSettings="settings" v-show="showConfig"></config>
            </div>

            <div class="ui vertical divider">
                <i class="pointing right icon"></i>                
            </div>

            <div class="center aligned column">
                <h3>
                    {{ getCurrency(rawPayment) }}
                    <br />
                    <small>base</small>
                </h3>
                <h2>
                    {{ getCurrency(result) }}
                    <br />
                    <small>overhours</small>
                </h2>
                <h3>
                    {{ getCurrency(newIncome) }}
                    <br />
                    <small>total</small>
                </h3>
            </div>
        </div>

    </div> 
</template>

<script>
    import Config from './Config.vue'
    import monthNames from '../../app/core/months.js'
    import dataAccess from '../../app/core/dataAccess.js'
    import bus from '../../app/core/eventBus.js'
    import IncomeCalc from '../../app/core/incomeCalc.js'    

    function getCurrentMonth() {
        var d = new Date()
        return monthNames.getMonthName(d.getMonth())
    }

    export default {
        components: {
            Config
        },
        data() {
            return {
                data: {
                },
                
                showConfig: false,
                month: '',
                result: 0,
                rawPayment: 0,
                newIncome: 0,
                
                settings: {}                            
            }
        },

        created() {
            this.month = getCurrentMonth().toLowerCase()
            
            var obj = dataAccess.getCurrent()
            this.data = obj.data
            this.settings = obj.settings
            this.incomeCalc = new IncomeCalc(this.settings)
            this.rawPayment = this.getIncome(0, this.data.netPayment)            

            bus.on('settings-closed', this.hideSettings)
            bus.on('settings-saved', this.setSettings)

            bus.emit('toggle-top-menu', true)
        },

        mounted() {          
            
        },
        methods: {
            toggleConfig(visible) {
                this.showConfig = visible
            },
            increase(val) {
                this.data.overhours += val
            },
            getIncome(overhours, payments) {            
                return this.incomeCalc.calc(this.data.workDays, overhours, payments)
            },
            recalculate() {
                this.rawPayment = this.getIncome(0, this.data.netPayment)
                this.calculate()
            },
            calculate() {
                var overhoursIncome = this.getIncome(this.data.overhours, this.data.netPayment)
                this.result = (overhoursIncome - this.rawPayment).toFixed(2)
                this.newIncome = overhoursIncome
            },
            hideSettings() {
                this.showConfig = false
            },
            setSettings(settings) {
                this.settings = settings
                this.incomeCalc = new IncomeCalc(this.settings)
                this.recalculate()
            },
            save() {
                dataAccess.saveCurrent(this.data, this.settings)
            },
            getCurrency(val) {
                return val + " zł"
            }
        },
        watch: {
            'data.overhours': function () {
                this.calculate()
            },
            'data.netPayment': function () {
                this.recalculate()
            },
            'data.workDays': function () {
                this.recalculate()
            }
        }
    }


</script>