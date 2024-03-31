import { useCallback } from 'react';
import { AppContext } from '@/context';
import useGetParentElem from '@/hooks/getParentElem';

const steps = ['YOUR INFO',	'SELECT PLAN',	'ADD-ONS',	'SUMMARY'];

export default function StepsSection() {
	const { state, setState } = AppContext();
	
	const handleClick = useCallback(function(e) {
		const li = useGetParentElem(e.target, 'li', 'ul');
		
		if(li?.dataset.index) {
			const activeStep = state.data[state.step];
			if(!activeStep.completed) return;
			
			setState(prev => ({
				...prev,
				step: li.dataset.index
			}));
		}
	}, []);
	
	return (
		<section className="md:col-span-2 stepSection p-8 pb-24 text-sm md:rounded-lg">
			<ul className="mx-auto flex items-center justify-center md:block" onClick={handleClick}>
				{
					steps.map((step, index) => (
						<li key={index} data-index={index} className="flex-ac md:mb-5">
							<div className={"step mr-3" + (state.step == index ? ' active-step' : '')}>{index +1}</div>
							<div className="hidden md:block text-xs">
								<div className="pastel">STEP {index +1}</div>
								<div className="fontBold lightGray">{step}</div>
							</div>
						</li>
					))
				}
			</ul>
		</section>
	);
}