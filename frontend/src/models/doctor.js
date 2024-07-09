export default class Doctor {
	static sort(listArray, filterArray) {
		const CheckParams = (arrayFilter, arrayIndex) => {
			return arrayFilter.filter(
				(variable) => arrayIndex.indexOf(variable.key) !== -1,
			)
		}

		if (Object.keys(filterArray).length !== 0) {
			listArray = listArray.filter((doctor) => {
				const {
					problems = [],
					methods = [],
					age_group = [],
				} = filterArray
				const docProblems = doctor.problems
					? CheckParams(doctor.problems, problems)
					: []
				const docMethods = doctor.methods
					? CheckParams(doctor.methods, methods)
					: []
				const docAgeGroup = doctor.age_group
					? CheckParams(doctor.age_group, age_group)
					: []

				if (
					docProblems.length > 0 ||
					docMethods.length > 0 ||
					docAgeGroup.length > 0
				) {
					return doctor
				}
			})
		}

		return listArray
	}
}
