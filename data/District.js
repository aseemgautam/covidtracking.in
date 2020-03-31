const districtData = [
	{
		State: 'Andaman and Nicobar Islands',
		Name: 'South Andaman',
		Cases: 9
	},
	{
		State: 'Andhra Pradesh',
		Name: 'Chitoor',
		Cases: 1
	},
	{
		State: 'Andhra Pradesh',
		Name: 'East Godavari',
		Cases: 2
	},
	{
		State: 'Andhra Pradesh',
		Name: 'Guntur',
		Cases: 2
	},
	{
		State: 'Andhra Pradesh',
		Name: 'Krishna',
		Cases: 3
	},
	{
		State: 'Andhra Pradesh',
		Name: 'Nellore',
		Cases: 1
	},
	{
		State: 'Andhra Pradesh',
		Name: 'Prakasam',
		Cases: 1
	},
	{
		State: 'Andhra Pradesh',
		Name: 'Vizag',
		Cases: 4
	},
	{
		State: 'BIHAR',
		Name: 'Munger',
		Cases: 3
	},
	{
		State: 'BIHAR',
		Name: 'Siwan',
		Cases: 1
	},
	{
		State: 'BIHAR',
		Name: 'PATNA',
		Cases: 4
	},
	{
		State: 'BIHAR',
		Name: 'Nalanda',
		Cases: 1
	},
	{
		State: 'Chandigarh',
		Name: 'Chandigarh',
		Cases: 8
	},
	{
		State: 'Chhattisgarh',
		Name: 'Raipur',
		Cases: 3
	},
	{
		State: 'Chhattisgarh',
		Name: 'Rajnandgaon',
		Cases: 1
	},
	{
		State: 'Chhattisgarh',
		Name: 'Durg',
		Cases: 1
	},
	{
		State: 'Chhattisgarh',
		Name: 'Bilaspur',
		Cases: 1
	},
	{
		State: 'Delhi',
		Name: 'Central',
		Cases: 4
	},
	{
		State: 'Delhi',
		Name: 'East Delhi',
		Cases: 5
	},
	{
		State: 'Delhi',
		Name: 'North Delhi',
		Cases: 4
	},
	{
		State: 'Delhi',
		Name: 'North East',
		Cases: 5
	},
	{
		State: 'Delhi',
		Name: 'North West',
		Cases: 5
	},
	{
		State: 'Delhi',
		Name: 'South Delhi',
		Cases: 8
	},
	{
		State: 'Delhi',
		Name: 'South West',
		Cases: 3
	},
	{
		State: 'Delhi',
		Name: 'West Delhi',
		Cases: 5
	},
	{
		State: 'Goa',
		Name: 'Goa',
		Cases: 3
	},
	{
		State: 'Gujarat',
		Name: 'Ahmedabad',
		Cases: 18
	},
	{
		State: 'Gujarat',
		Name: 'Gandhinagar',
		Cases: 9
	},
	{
		State: 'Gujarat',
		Name: 'Kutch',
		Cases: 1
	},
	{
		State: 'Gujarat',
		Name: 'Rajkot',
		Cases: 8
	},
	{
		State: 'Gujarat',
		Name: 'Mehsana',
		Cases: 1
	},
	{
		State: 'Gujarat',
		Name: 'Surat',
		Cases: 6
	},
	{
		State: 'Gujarat',
		Name: 'Vadodara',
		Cases: 9
	},
	{
		State: 'Gujarat',
		Name: 'Bhavnagar',
		Cases: 1
	},
	{
		State: 'Haryana',
		Name: 'Faridabad',
		Cases: 2
	},
	{
		State: 'Haryana',
		Name: 'Gurugram',
		Cases: 24
	},
	{
		State: 'Haryana',
		Name: 'Palwal',
		Cases: 1
	},
	{
		State: 'Haryana',
		Name: 'Panchkula',
		Cases: 1
	},
	{
		State: 'Haryana',
		Name: 'Panipat',
		Cases: 4
	},
	{
		State: 'Haryana',
		Name: 'Sonipat',
		Cases: 1
	},
	{
		State: 'Himachal Pradesh',
		Name: 'Kangra',
		Cases: 3
	},
	{
		State: 'Jammu and Kashmir',
		Name: 'Jammu',
		Cases: 3
	},
	{
		State: 'Jammu and Kashmir',
		Name: 'Rajauri',
		Cases: 3
	},
	{
		State: 'Jammu and Kashmir',
		Name: 'Udhampur',
		Cases: 3
	},
	{
		State: 'Jammu and Kashmir',
		Name: 'Srinagar',
		Cases: 12
	},
	{
		State: 'Jammu and Kashmir',
		Name: 'Bandipora',
		Cases: 8
	},
	{
		State: 'Jammu and Kashmir',
		Name: 'Budgam',
		Cases: 1
	},
	{
		State: 'Jammu and Kashmir',
		Name: 'Pulwama',
		Cases: 1
	},
	{
		State: 'Karnataka',
		Name: 'BBMP',
		Cases: 26
	},
	{
		State: 'Karnataka',
		Name: 'Bengaluru Urban',
		Cases: 17
	},
	{
		State: 'Karnataka',
		Name: 'Chikkaballapura',
		Cases: 6
	},
	{
		State: 'Karnataka',
		Name: 'Dakshin Kannada',
		Cases: 7
	},
	{
		State: 'Karnataka',
		Name: 'Dharwad',
		Cases: 1
	},
	{
		State: 'Karnataka',
		Name: 'Kalaburgi',
		Cases: 3
	},
	{
		State: 'Karnataka',
		Name: 'Kodagu',
		Cases: 1
	},
	{
		State: 'Karnataka',
		Name: 'Mysore',
		Cases: 3
	},
	{
		State: 'Karnataka',
		Name: 'Tumkuru',
		Cases: 1
	},
	{
		State: 'Karnataka',
		Name: 'Udupi',
		Cases: 1
	},
	{
		State: 'Karnataka',
		Name: 'Uttar Kannada',
		Cases: 7
	},
	{
		State: 'Karnataka',
		Name: 'Davangere',
		Cases: 3
	},
	{
		State: 'Kerala',
		Name: 'Alappuzha',
		Cases: 2
	},
	{
		State: 'Kerala',
		Name: 'Ernakulam',
		Cases: 19
	},
	{
		State: 'Kerala',
		Name: 'Idukki',
		Cases: 2
	},
	{
		State: 'Kerala',
		Name: 'Kannur',
		Cases: 27
	},
	{
		State: 'Kerala',
		Name: 'Kasargod',
		Cases: 78
	},
	{
		State: 'Kerala',
		Name: 'Kottayam',
		Cases: 6
	},
	{
		State: 'Kerala',
		Name: 'Kozhikode',
		Cases: 9
	},
	{
		State: 'Kerala',
		Name: 'Palakkad',
		Cases: 4
	},
	{
		State: 'Kerala',
		Name: 'Pathanamthitta',
		Cases: 10
	},
	{
		State: 'Kerala',
		Name: 'Wayanad',
		Cases: 1
	},
	{
		State: 'Kerala',
		Name: 'Thiruvanthpuram',
		Cases: 8
	},
	{
		State: 'Kerala',
		Name: 'Mallapuram',
		Cases: 8
	},
	{
		State: 'Kerala',
		Name: 'Thrissur',
		Cases: 6
	},
	{
		State: 'Kerala',
		Name: 'Kollam',
		Cases: 2
	},
	{
		State: 'Ladakh',
		Name: 'Kargil',
		Cases: 2
	},
	{
		State: 'Ladakh',
		Name: 'Leh',
		Cases: 11
	},
	{
		State: 'Madhya Pradesh',
		Name: 'Bhopal',
		Cases: 3
	},
	{
		State: 'Madhya Pradesh',
		Name: 'Gwalior',
		Cases: 1
	},
	{
		State: 'Madhya Pradesh',
		Name: 'Indore',
		Cases: 10
	},
	{
		State: 'Madhya Pradesh',
		Name: 'Shivpuri',
		Cases: 2
	},
	{
		State: 'Madhya Pradesh',
		Name: 'Ujjain',
		Cases: 4
	},
	{
		State: 'Madhya Pradesh',
		Name: 'Jabalpur',
		Cases: 8
	},
	{
		State: 'Madhya Pradesh',
		Name: 'Unknown',
		Cases: 2
	},
	{
		State: 'Maharashtra',
		Name: 'Ahmednagar',
		Cases: 3
	},
	{
		State: 'Maharashtra',
		Name: 'Aurangabad',
		Cases: 1
	},
	{
		State: 'Maharashtra',
		Name: 'Mumbai',
		Cases: 81
	},
	{
		State: 'Maharashtra',
		Name: 'Gondia',
		Cases: 1
	},
	{
		State: 'Maharashtra',
		Name: 'Nagpur',
		Cases: 12
	},
	{
		State: 'Maharashtra',
		Name: 'Kolhapur',
		Cases: 1
	},
	{
		State: 'Maharashtra',
		Name: 'Palghar',
		Cases: 2
	},
	{
		State: 'Maharashtra',
		Name: 'Pune',
		Cases: 31
	},
	{
		State: 'Maharashtra',
		Name: 'Raigad',
		Cases: 1
	},
	{
		State: 'Maharashtra',
		Name: 'Ratnagiri',
		Cases: 1
	},
	{
		State: 'Maharashtra',
		Name: 'Sangli',
		Cases: 24
	},
	{
		State: 'Maharashtra',
		Name: 'Satara',
		Cases: 2
	},
	{
		State: 'Maharashtra',
		Name: 'Sindhudurg',
		Cases: 1
	},
	{
		State: 'Maharashtra',
		Name: 'Thane',
		Cases: 16
	},
	{
		State: 'Maharashtra',
		Name: 'Yavatmal',
		Cases: 4
	},
	{
		State: 'Maharashtra',
		Name: 'Unknown',
		Cases: 5
	},
	{
		State: 'Manipur',
		Name: 'Imphal West',
		Cases: 1
	},
	{
		State: 'Mizoram',
		Name: 'Aizwal (W)',
		Cases: 1
	},
	{
		State: 'Odisha',
		Name: 'Khurda',
		Cases: 3
	},
	{
		State: 'Puducherry',
		Name: 'Mahe',
		Cases: 1
	},
	{
		State: 'Punjab',
		Name: 'Amritsar',
		Cases: 1
	},
	{
		State: 'Punjab',
		Name: 'Hoshiarpur',
		Cases: 6
	},
	{
		State: 'Punjab',
		Name: 'Jalandhar',
		Cases: 5
	},
	{
		State: 'Punjab',
		Name: 'Ludhiana',
		Cases: 1
	},
	{
		State: 'Punjab',
		Name: 'Nawanshahr',
		Cases: 1
	},
	{
		State: 'Punjab',
		Name: 'SAS Nagar',
		Cases: 6
	},
	{
		State: 'Punjab',
		Name: 'SBS Nagar',
		Cases: 18
	},
	{
		State: 'Rajasthan',
		Name: 'Bhilwara',
		Cases: 22
	},
	{
		State: 'Rajasthan',
		Name: 'Jaipur',
		Cases: 8
	},
	{
		State: 'Rajasthan',
		Name: 'Jhunjhunu',
		Cases: 6
	},
	{
		State: 'Rajasthan',
		Name: 'Jodhpur',
		Cases: 6
	},
	{
		State: 'Rajasthan',
		Name: 'Pali',
		Cases: 1
	},
	{
		State: 'Rajasthan',
		Name: 'Dungarpur',
		Cases: 2
	},
	{
		State: 'Rajasthan',
		Name: 'Ajmer',
		Cases: 1
	},
	{
		State: 'Rajasthan',
		Name: 'Pratapgarh',
		Cases: 2
	},
	{
		State: 'Rajasthan',
		Name: 'Sikar',
		Cases: 1
	},
	{
		State: 'Rajasthan',
		Name: 'Churu',
		Cases: 1
	},
	{
		State: 'Rajasthan',
		Name: 'Unknown',
		Cases: 4
	},
	{
		State: 'Tamil Nadu',
		Name: 'Ariyalur',
		Cases: 1
	},
	{
		State: 'Tamil Nadu',
		Name: 'Chennai',
		Cases: 18
	},
	{
		State: 'Tamil Nadu',
		Name: 'Coimbatoor',
		Cases: 1
	},
	{
		State: 'Tamil Nadu',
		Name: 'Erode',
		Cases: 5
	},
	{
		State: 'Tamil Nadu',
		Name: 'Kanchipurum',
		Cases: 1
	},
	{
		State: 'Tamil Nadu',
		Name: 'Madurai',
		Cases: 4
	},
	{
		State: 'Tamil Nadu',
		Name: 'Salem',
		Cases: 6
	},
	{
		State: 'Tamil Nadu',
		Name: 'Thanjavur',
		Cases: 1
	},
	{
		State: 'Tamil Nadu',
		Name: 'Tiruneveli',
		Cases: 1
	},
	{
		State: 'Tamil Nadu',
		Name: 'Tirupur',
		Cases: 1
	},
	{
		State: 'Tamil Nadu',
		Name: 'Trichy',
		Cases: 1
	},
	{
		State: 'Tamil Nadu',
		Name: 'Vellore',
		Cases: 2
	},
	{
		State: 'Telangana',
		Name: 'Bhadradri Kothagudam',
		Cases: 4
	},
	{
		State: 'Telangana',
		Name: 'Hyderabad',
		Cases: 27
	},
	{
		State: 'Telangana',
		Name: 'Karimnagar',
		Cases: 1
	},
	{
		State: 'Telangana',
		Name: 'Madchal',
		Cases: 1
	},
	{
		State: 'Telangana',
		Name: 'Mahboobnagar',
		Cases: 1
	},
	{
		State: 'Telangana',
		Name: 'Medchal',
		Cases: 3
	},
	{
		State: 'Telangana',
		Name: 'Ranga Reddy',
		Cases: 7
	},
	{
		State: 'Telangana',
		Name: 'Warangal (U)',
		Cases: 1
	},
	{
		State: 'Telangana',
		Name: 'Unknown',
		Cases: 21
	},
	{
		State: 'Uttar Pradesh',
		Name: 'Agra',
		Cases: 10
	},
	{
		State: 'Uttar Pradesh',
		Name: 'GB Nagar',
		Cases: 22
	},
	{
		State: 'Uttar Pradesh',
		Name: 'Ghaziabad',
		Cases: 5
	},
	{
		State: 'Uttar Pradesh',
		Name: 'Jaunpur',
		Cases: 1
	},
	{
		State: 'Uttar Pradesh',
		Name: 'Kanpur',
		Cases: 1
	},
	{
		State: 'Uttar Pradesh',
		Name: 'Lakhimpur Kheri',
		Cases: 1
	},
	{
		State: 'Uttar Pradesh',
		Name: 'Lucknow',
		Cases: 8
	},
	{
		State: 'Uttar Pradesh',
		Name: 'Moradabd',
		Cases: 1
	},
	{
		State: 'Uttar Pradesh',
		Name: 'Philibhit',
		Cases: 2
	},
	{
		State: 'Uttar Pradesh',
		Name: 'Shamli',
		Cases: 1
	},
	{
		State: 'Uttar Pradesh',
		Name: 'Bagpat',
		Cases: 1
	},
	{
		State: 'Uttar Pradesh',
		Name: 'Meerut',
		Cases: 1
	},
	{
		State: 'Uttar Pradesh',
		Name: 'Varanasi',
		Cases: 1
	},
	{
		State: 'Uttarakhand',
		Name: 'Dehradun',
		Cases: 4
	},
	{
		State: 'Uttarakhand',
		Name: 'Pauri Garhwal',
		Cases: 1
	},
	{
		State: 'Uttarakhand',
		Name: 'Unknown',
		Cases: 1
	},
	{
		State: 'West Bengal',
		Name: 'Kolkata',
		Cases: 7
	},
	{
		State: 'West Bengal',
		Name: 'Nadia',
		Cases: 5
	},
	{
		State: 'West Bengal',
		Name: 'North 24 Pargana',
		Cases: 2
	},
	{
		State: 'West Bengal',
		Name: 'South 24 Pargana',
		Cases: 1
	},
	{
		State: 'West Bengal',
		Name: 'East Mirzapur',
		Cases: 2
	},
	{
		State: 'Total',
		Name: 'Total',
		Cases: 979
	}
];

Object.freeze(districtData);
export default districtData;
