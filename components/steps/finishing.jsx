import { AppContext } from '@/context';

export default function Finishing() {
	const { state, setState } = AppContext();
	
	let { plan, price, expiry } = state.data[1];
	price = expiry ? price * 10 : price;
	// Cloning all addOns value (objects) so that expiry mapping function below
	// doesn't override the state value
	let addOns = state.data[2].addOns.filter(e => e).map(e => ({ ...e }));
	if(expiry) {
		addOns = addOns.map(e => {
			e.price *= 10;
			return e;
		});
	}

	const priceSuffix = expiry ? 'yr' : 'mo';
	const totalCost = Number(price) + (addOns.reduce((acc, cur) => (acc += Number(cur.price), acc), 0) || 0);

	return (
		<>
			<div className="marine text-xs fontMedium rounded-lg p-4 bg-magnolia mt-3">
				<div className={"flex-ac justify-between" + (addOns.length > 0 ? " pb-3" : "")}>
					<div>
						<h2>
							<strong>{plan} ({expiry ? 'Yearly' : 'Monthly'})</strong>
						</h2>
						<span className="coolGray hover:text-blue-700 cursor-pointer" onClick={() => setState(prev => ({ ...prev, step: 1 }))}>
							<u>Change</u>
						</span>
					</div>
					<strong>${price}/{priceSuffix}</strong>
				</div>
				{ addOns.length > 0 && <hr /> }
				{addOns.map((addOn, index) => {
					return (
						<div key={index} className="flex-ac justify-between pt-3">
							<span className="coolGray">{addOn.heading}</span>
							<span>+${addOn.price}/{priceSuffix}</span>
						</div>
					)
				})}
			</div>
			<div className="p-4 pb-0 flex-ac justify-between">
				<p className="text-xs coolGray fontMedium">Total ({expiry ? "per year" : "per month"})</p>
				<strong className="text-sm purplish fontBold">+${totalCost}/{priceSuffix}</strong>
			</div>
		</>
	);
}