<template>
	<div id="voucherPool">
		<div id="title">
			<h3>
				Meus vouchers
			</h3>
		</div>
		<div class="allVouchers">
			<h3 v-if="!vouchers[0]">Você ainda não possui Vouchers</h3>
			<div class="voucher" v-for="voucher in vouchers" :key="voucher._id">
				<div class="left_part">
					<div class="voucherTitle">{{ voucher.productName }}</div>
					<div class="voucherCode">{{ voucher.voucher }}</div>
				</div>
				<div class="right_part">
					<div class="voucherStatus">{{ isValid(voucher.validUntil) }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import axios from "axios"

export default ({
	name: "Vouchers",
	props: ['tabSelected'],
	data() {
		return {
			vouchers: [],
		}
	},
	beforeMount() {
		if (this.tabSelected === 'Vouchers')
			this.voucherUpdate();
	},
	methods: {
		isValid(until) {
			const expire = new Date(until);
			if (Date.now() >= expire.getTime())
				return ("EXPIRADO");
			return ("VÁLIDO");
		},
		voucherUpdate() {
	        axios.get(process.env.VUE_APP_API_IP + "/vouchers/" + this.$cookies.get("id"))
				.then(res => {
					this.vouchers = res.data.reverse();
			})
		}
	} 
})
</script>

<style scoped>

#title h3{
	font-weight: 300;
	font-size: 35px;
}

.voucherTitle{
	display: flex;
	height: 50%;
	justify-content: space-evenly;
	align-items: flex-end;
	font-weight: 600;
	font-size: 20px;
	text-align: center;
	padding-bottom: 8px;
	/* margin-left: 180px;
	margin-top: 50px; */
}
.voucherCode{
	display: flex;
	height: 50%;
	justify-content: space-evenly;
	align-items: flex-end;
	font-size: 30px;
	padding-bottom: 28px;
}
.voucherStatus{
	display: flex;
	justify-content: space-evenly;
	align-items: flex-end;
	padding-top: 75%;
	color: white;
	padding-left: 7%;
}

#voucherPool {
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100%;
	margin-top: 115px;
	min-height: 77.5vh;
}

#id {
	font-weight: 300;
	font-size: 38px;
	line-height: 35px;	
}

.voucher {
	margin: 3%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	grid-template-columns: none;
	width: 400px;
	height: 165px;
	background-image: url("../assets/voucher.svg");
	background-origin: content-box;
	background-repeat: no-repeat;
	background-position: center center;
}

.allVouchers {
	height: auto;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	grid-template-columns: auto auto;
}

.right_part{
	width: 35%;
	height: 100%;
}

.left_part{
	display: flex;
	flex-direction: column;
	width: 65%;
	height: 100%;
}

.allVouchers h3{
	margin-top: 50px;
}

@media screen and (max-width: 400px) {
	.allVouchers h3 {
		padding: 0 5%;
	}

	#title h3 {
		font-size: 32px;
	}

	.voucher {
		width: 340px;
		height: 146px;
	}

	.voucherTitle {
		justify-items: center;
		padding: 0px 5% 8px 5%;
	}

	.voucherCode {
		font-size: 25px;
	}

	.voucherStatus {
		padding-top: 80%;
	}
}

</style>