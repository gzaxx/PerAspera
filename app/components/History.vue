<template>
    <div class="ui container">
        <div class="ui horizontal divider">HISTORY</div>

        <div class="ui horizontal list">
            <div v-for="m in months" class="item">
                <div class="content">
                    <div class="header">{{ m.name }}</div>
                    {{ m.hasData }}
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
            data[i].name = months[i]
            data[i].hasData = fileData[i]
        }

        return data
    }

    export default {
        data() {
            return {
                year: 2016,
                months: []
            }
        },
        created() {
            this.months = createData(this.year)
        }
    }
</script>