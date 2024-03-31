import { AppContext } from '@/context';
import PersonalInfo from './steps/personalInfo';
import SelectPlan from './steps/selectPlan';
import AddOns from './steps/addOns';
import Finishing from './steps/finishing';
import ThankYou from './steps/thanksPage';

const StepsUIComponents = [
	() => ({
		heading: 'Personal info',
		description: 'Please provide your name, email address, and phone number.',
		children: <PersonalInfo />,
	}),
	() => ({
		heading: 'Select your plan',
		description: 'You have the option of monthly or yearly billing.',
		children: <SelectPlan />
	}),
	() => ({
		heading: 'Pick add-ons',
		description: 'Add-ons help enhance your gaming experience.',
		children: <AddOns />
	}),
	() => ({
		heading: 'Finishing up',
		description: 'Double-check everything looks OK before confirming.',
		children: <Finishing />
	}),
	() => ({
		endOfTheRoad: true,
		children: <ThankYou />
	})
];

export default function StepsUI() {
	const { state } = AppContext();
	
	const ui = StepsUIComponents[state.step]();
	
	return (
		<StepUICard heading={ui.heading} description={ui.description} endOfTheRoad={ui.endOfTheRoad}>
			{ui.children}
		</StepUICard>
	);
}

function StepUICard(props) {
	return (
		<div className="rounded-lg bg-white flex-grow mx-4 p-6 transform -translate-y-16 md:transform-none md:m-0">
			{ !props.endOfTheRoad && (
				<>
					<h1 className="text-xl">
						<strong>{props.heading}</strong>
					</h1>
					<p className="coolGray text-sm py-2 fontMedium">{props.description}</p>
				</>
			)}
			{props.children}
		</div>
	);
}