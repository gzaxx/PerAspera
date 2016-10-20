<template>
    <div class="ui container my-container">
        <div class="ui two column middle aligned very relaxed stackable grid">
            <div class="column">
                <div class="ui form">
                    <p>
                        <div class="field">
                            <label>Work days in {{ month }}</label>
                            <div class="ui left icon input">
                                <input name="workDays" placeholder="22" type="text" v-model.number="workDays">
                                <i class="calendar icon"></i>
                            </div>
                        </div>
                    </p>

                    <p>
                        <div class="field">
                            <label>Overhours</label>
                            <div class="ui left icon disabled input">
                                <input name="overhours" placeholder="1000 PLN" type="text" v-model.number="overhours">
                                <i class="money icon"></i>
                            </div>
                        </div>

                        <div class="ui blue submit button" @click='increase(1)'>+1</div>
                        <div class="ui blue submit button" @click='increase(0.5)'>+0.5</div>
                    </p>

                    <p>
                        <div class="field">
                            <label>Net payments</label>
                            <div class="ui left icon input">
                                <input name="netPayments" placeholder="1000 PLN" type="text"  v-model.number="netPayment">
                                <i class="dollar icon"></i>
                            </div>
                        </div>
                    </p>                    
                </div>
            </div>

            <div class="ui vertical divider">
                <i class="pointing right icon"></i>                
            </div>

            <div class="center aligned column">
                <h3>
                    {{ rawPayment }}
                </h3>
                <h2>
                    {{ result }}
                </h2>
                <h3>
                    {{ newIncome }}
                </h3>
            </div>
        </div>

    </div> 
</template>

<script>
    import monthNames from '../../app/core/months.js'
    import bus from '../../app/core/eventBus.js'
    import IncomeCalc from '../../app/core/incomeCalc.js'
    import config from '../../app/configuration/config.js'

    function getCurrentMonth() {
        var d = new Date()
        return monthNames.getMonthName(d.getMonth())
    }

    export default {
        data() {
            return {
                month: '',
                workDays: 22,
                result: 0,
                netPayment: 0,
                overhours: 0,
                settings: {},
                rawPayment: 0,
                newIncome: 0
            }
        },

        created() {
            this.month = getCurrentMonth().toLowerCase()
            this.settings = config.readConfig()
            this.incomeCalc = new IncomeCalc(this.settings)
            this.rawPayment = Math.round(this.getIncome(0, 0), 2)            
        },

        mounted() {          
            
        },
        methods: {
            increase(val) {
                this.overhours += val
            },
            getIncome(overhours, payments) {            
                return this.incomeCalc.calc(this.workDays, overhours, payments)
            },
            calculate() {
                var overhoursIncome = this.getIncome(this.overhours, this.netPayment)
                this.result = Math.abs(Math.round(overhoursIncome - this.rawPayment, 2))
                this.newIncome = Math.round(overhoursIncome, 2)
            }
        },
        watch: {
            overhours: function () {
                this.calculate()
            },
            netPayment: function () {
                this.rawPayment = Math.round(this.getIncome(0, this.netPayment), 2)
                this.calculate()
            },
            workDays: function() {
                this.rawPayment = this.getIncome(0, this.netPayment)
                this.calculate()
            }
        },
        filters: {
            currency: {
                read: function (value) {
                    return value.toFixed(2) + "zł"
                },
                write: function (value) {
                    var number = +value.replace(/[^\d.]/g, '')
                    return isNaN(number) ? 0 : number
                }
            }
        }
    }


</script>