/* eslint-disable import/prefer-default-export */
const stateYData = [
	{
		Id: 1,
		Name: 'Andhra Pradesh',
		Confirmed: 86,
		Cured: 1,
		Deaths: 1
	},
	{
		Id: 2,
		Name: 'Andaman and Nicobar Islands',
		Confirmed: 10,
		Cured: 0,
		Deaths: 0
	},
	{
		Id: 3,
		Name: 'Assam',
		Confirmed: 1,
		Cured: 0,
		Deaths: 0
	},
	{
		Id: 4,
		Name: 'Bihar',
		Confirmed: 23,
		Cured: 0,
		Deaths: 1
	},
	{
		Id: 5,
		Name: 'Chandigarh',
		Confirmed: 16,
		Cured: 0,
		Deaths: 0
	},
	{
		Id: 6,
		Name: 'Chhattisgarh',
		Confirmed: 9,
		Cured: 2,
		Deaths: 0
	},
	{
		Id: 7,
		Name: 'Delhi',
		Confirmed: 152,
		Cured: 6,
		Deaths: 2
	},
	{
		Id: 8,
		Name: 'Goa',
		Confirmed: 5,
		Cured: 0,
		Deaths: 0
	},
	{
		Id: 9,
		Name: 'Gujarat',
		Confirmed: 82,
		Cured: 5,
		Deaths: 6
	},
	{
		Id: 10,
		Name: 'Haryana',
		Confirmed: 43,
		Cured: 21,
		Deaths: 0
	},
	{
		Id: 11,
		Name: 'Himachal Pradesh',
		Confirmed: 3,
		Cured: 1,
		Deaths: 1
	},
	{
		Id: 12,
		Name: 'Jammu and Kashmir',
		Confirmed: 62,
		Cured: 2,
		Deaths: 2
	},
	{
		Id: 13,
		Name: 'Jharkhand',
		Confirmed: 1,
		Cured: 0,
		Deaths: 0
	},
	{
		Id: 14,
		Name: 'Karnataka',
		Confirmed: 110,
		Cured: 9,
		Deaths: 3
	},
	{
		Id: 15,
		Name: 'Kerala',
		Confirmed: 265,
		Cured: 25,
		Deaths: 2
	},
	{
		Id: 16,
		Name: 'Ladakh',
		Confirmed: 13,
		Cured: 3,
		Deaths: 0
	},
	{
		Id: 17,
		Name: 'Madhya Pradesh',
		Confirmed: 99,
		Cured: 0,
		Deaths: 6
	},
	{
		Id: 18,
		Name: 'Maharashtra',
		Confirmed: 335,
		Cured: 42,
		Deaths: 13
	},
	{
		Id: 19,
		Name: 'Manipur',
		Confirmed: 1,
		Cured: 0,
		Deaths: 0
	},
	{
		Id: 20,
		Name: 'Mizoram',
		Confirmed: 1,
		Cured: 0,
		Deaths: 0
	},
	{
		Id: 21,
		Name: 'Odisha',
		Confirmed: 4,
		Cured: 0,
		Deaths: 0
	},
	{
		Id: 22,
		Name: 'Puducherry',
		Confirmed: 3,
		Cured: 1,
		Deaths: 0
	},
	{
		Id: 23,
		Name: 'Punjab',
		Confirmed: 46,
		Cured: 1,
		Deaths: 4
	},
	{
		Id: 24,
		Name: 'Rajasthan',
		Confirmed: 108,
		Cured: 3,
		Deaths: 0
	},
	{
		Id: 25,
		Name: 'Tamil Nadu',
		Confirmed: 234,
		Cured: 6,
		Deaths: 1
	},
	{
		Id: 26,
		Name: 'Telengana',
		Confirmed: 96,
		Cured: 1,
		Deaths: 3
	},
	{
		Id: 27,
		Name: 'Uttarakhand',
		Confirmed: 7,
		Cured: 2,
		Deaths: 0
	},
	{
		Id: 28,
		Name: 'Uttar Pradesh',
		Confirmed: 113,
		Cured: 14,
		Deaths: 2
	},
	{
		Id: 29,
		Name: 'West Bengal',
		Confirmed: 37,
		Cured: 6,
		Deaths: 3
	},
	{
		Id: 98,
		Name: 'Total',
		Confirmed: 1965,
		Cured: 151,
		Deaths: 50
	}
];
stateYData.sort((a, b) => {
	return b.Confirmed - a.Confirmed;
});
Object.freeze(stateYData);
export default stateYData;
