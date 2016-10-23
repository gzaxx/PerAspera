<template>
    <div class="ui container">
        <div class="ui horizontal divider">HISTORY</div>

        <div class="ui borderless menu">
            <a class="item" v-bind:class="{ active: isActiveYear(y) }" v-for="y in years" @click="showYear(y)">{{ y }}</a>            
        </div>

        <div class="ui cards">
            <div class="card" v-for="m in months">
                <div class="content">                
                    <div class="header">
                        {{ m.name }}
                    </div>
                    <div class="meta">
                    
                    </div>
                    <div class="description">
                        <div class="ui success message" v-if="m.hasData">    
                            <div class="header">
                                Great success
                            </div>
                            <p>Bonus income</p>
                        </div> 

                        <div class="ui negative message"  v-if="!m.hasData">                        
                            <div class="header">
                                Greate fail
                            </div>
                            <p>No bonus</p>
                        </div>                              
                    </div>
                </div>
                <div class="extra content">
                    <button class="ui pink basic button" @click="showDetails(m.month)">Show</button>                    
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import monthNames from '../../app/core/months.js'
    import dataAccess from '../../app/core/dataAccess.js'

    function createData(year) {
        var data = []
        var months = monthNames.getMonths()
        var fileData = dataAccess.hasMonthDataInYear(year)

        for (var i = 0, len = months.length; i < len; i++) {
            data[i] = {}
            data[i].month = i
            data[i].name = months[i]
            data[i].hasData = fileData[i]
        }

        return data
    }

    export default {
        data() {
            return {                
                year: 2016,
                months: [],
                years: [
                    2016,
                    2017
                ]
            }
        },        
        created() {
            this.months = createData(this.year)
        },
        methods: {
            showYear(year) {   
                this.year = year             
                this.months = createData(year)
            },
            isActiveYear: function (year) {
                return this.year === year
            },
            showDetails: function (month) {

            }
        }
    }
</script>