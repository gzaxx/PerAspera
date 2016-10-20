export default class {

    constructor(settings) {
        this.settings = settings; 
    }

    calc(workDays, overhours, netIncome) {
        var perHour = Math.round(this.settings.income / workDays, 2)
        var overhoursBonus = (perHour / 8) * overhours

        var incomeTotal = this.settings.income + overhoursBonus
        incomeTotal = ((incomeTotal - parseFloat(netIncome)) - this.settings.socialTax) - this.settings.workFund

        var healthTax = this.settings.healthTax * 0.8611

        incomeTotal = (incomeTotal * 0.18)
        incomeTotal = incomeTotal - healthTax        

        return (this.settings.income + overhoursBonus) - (incomeTotal + this.settings.socialTax + this.settings.workFund + this.settings.healthTax)
    }
};