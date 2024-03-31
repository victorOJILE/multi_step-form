import { AppContext } from '@/context';
import useGetParentElem from '/hooks/getParentElem';

const options = [
	{
		heading: 'Online service',
		description: 'Access to multiplayer games',
		price: 1
	},
	{
		heading: 'Larger storage',
		description: 'Extra 1TB of cloud save',
		price: 2
	},
	{
		heading: 'Customizable Profile',
		description: 'Custom theme on your profile',
		price: 2
	}
];

export default function AddOns() {
	const { state, setState } = AppContext();
	// Adding add-ons is the third step, hence 2
	const plan = state.data[1];
	const data = state.data[2].addOns;
	
	function handleClick(e) {
		const li = useGetParentElem(e.target, 'li', 'ul');
		
		if (li?.dataset.index) {
			setState(prev => {
				const addOns = prev.data[2].addOns;
				const addOnIndex = li.dataset.index;
				
				if(addOns[addOnIndex]) {
					addOns[addOnIndex] = undefined;
				} else {
					// Selecting a plan is the second step, hence 1
					addOns[addOnIndex] = options[addOnIndex];
				}
			
				// returning a new object so state can be updated
				return {
					...prev
				}
			});
		}
	}
	
	return (
		<form className="marine text-xs fontMedium py-3">
			<ul className="grid gap-3" onClick={handleClick}>
				{
					options.map((addOn, index) => {
						let price = plan.expiry ? addOn.price * 10 : addOn.price;
						let priceSuffix = plan.expiry ? "yr" : "mo";
						
						return (
							<li 
								key={index} 
								className={"flex-ac rounded-lg p-3 border hover:border-blue-800 focus:border-blue cursor-pointer" + (!!data[index] ? " bg-magnolia border-blue-800" : " border-gray-300")}
								data-index={index}
								>
								<input className="mr-3" type="checkbox" checked={!!data[index]} />
								<div className="flex-grow">
									<h2 className="text-xs">{addOn.heading}</h2>
									<small className="coolGray">{addOn.description}</small>
								</div>
								<small className="purplish">+${price}/{priceSuffix}</small>
							</li>
						)
					})
				}
			</ul>
		</form>
	);
}