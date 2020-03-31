const stateData = [
	{
		No: 1,
		Name: 'Andhra Pradesh',
		Confirmed: 23,
		Discharged: 1,
		Fatal: 0
	},
	{
		No: 2,
		Name: 'Andaman and Nicobar Islands',
		Confirmed: 9,
		Discharged: 0,
		Fatal: 0
	},
	{
		No: 3,
		Name: 'Bihar',
		Confirmed: 15,
		Discharged: 0,
		Fatal: 1
	},
	{
		No: 4,
		Name: 'Chandigarh',
		Confirmed: 8,
		Discharged: 0,
		Fatal: 0
	},
	{
		No: 5,
		Name: 'Chhattisgarh',
		Confirmed: 7,
		Discharged: 0,
		Fatal: 0
	},
	{
		No: 6,
		Name: 'Delhi',
		Confirmed: 87,
		Discharged: 6,
		Fatal: 2
	},
	{
		No: 7,
		Name: 'Goa',
		Confirmed: 5,
		Discharged: 0,
		Fatal: 0
	},
	{
		No: 8,
		Name: 'Gujarat',
		Confirmed: 69,
		Discharged: 1,
		Fatal: 6
	},
	{
		No: 9,
		Name: 'Haryana',
		Confirmed: 36,
		Discharged: 18,
		Fatal: 0
	},
	{
		No: 10,
		Name: 'Himachal Pradesh',
		Confirmed: 3,
		Discharged: 0,
		Fatal: 1
	},
	{
		No: 11,
		Name: 'Jammu and Kashmir',
		Confirmed: 48,
		Discharged: 2,
		Fatal: 2
	},
	{
		No: 12,
		Name: 'Karnataka',
		Confirmed: 83,
		Discharged: 5,
		Fatal: 3
	},
	{
		No: 13,
		Name: 'Kerala',
		Confirmed: 202,
		Discharged: 19,
		Fatal: 1
	},
	{
		No: 14,
		Name: 'Ladakh',
		Confirmed: 13,
		Discharged: 3,
		Fatal: 0
	},
	{
		No: 15,
		Name: 'Madhya Pradesh',
		Confirmed: 47,
		Discharged: 0,
		Fatal: 3
	},
	{
		No: 16,
		Name: 'Maharashtra',
		Confirmed: 198,
		Discharged: 25,
		Fatal: 8
	},
	{
		No: 17,
		Name: 'Manipur',
		Confirmed: 1,
		Discharged: 0,
		Fatal: 0
	},
	{
		No: 18,
		Name: 'Mizoram',
		Confirmed: 1,
		Discharged: 0,
		Fatal: 0
	},
	{
		No: 19,
		Name: 'Odisha',
		Confirmed: 3,
		Discharged: 0,
		Fatal: 0
	},
	{
		No: 20,
		Name: 'Puducherry',
		Confirmed: 1,
		Discharged: 0,
		Fatal: 0
	},
	{
		No: 21,
		Name: 'Punjab',
		Confirmed: 38,
		Discharged: 1,
		Fatal: 1
	},
	{
		No: 22,
		Name: 'Rajasthan',
		Confirmed: 59,
		Discharged: 3,
		Fatal: 0
	},
	{
		No: 23,
		Name: 'Tamil Nadu',
		Confirmed: 67,
		Discharged: 4,
		Fatal: 1
	},
	{
		No: 24,
		Name: 'Telangana',
		Confirmed: 71,
		Discharged: 1,
		Fatal: 1
	},
	{
		No: 25,
		Name: 'Uttarakhand',
		Confirmed: 7,
		Discharged: 2,
		Fatal: 0
	},
	{
		No: 26,
		Name: 'Uttar Pradesh',
		Confirmed: 82,
		Discharged: 11,
		Fatal: 0
	},
	{
		No: 27,
		Name: 'West Bengal',
		Confirmed: 22,
		Discharged: 0,
		Fatal: 2
	},
	{
		No: 99,
		Name: 'Total',
		Confirmed: 1251,
		Discharged: 102,
		Fatal: 32
	},
	{
		No: 98,
		Name: 'Subtotal',
		Confirmed: 1205,
		Discharged: '',
		Fatal: ''
	}
];
stateData.sort((a, b) => {
	return b.Confirmed - a.Confirmed;
});
Object.freeze(stateData);
export default stateData;
