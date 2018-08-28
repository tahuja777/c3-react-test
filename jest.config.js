module.exports = {
	testPathIgnorePatterns: [
		"<rootDir>/node_modules/",
	],
	coverageDirectory: "<rootDir>/coverage/",
	coverageReporters: ["html", "cobertura", "lcov"],
	collectCoverage: true,
	collectCoverageFrom: [
		"src/**/*.{js,jsx}",
	],
	setupFiles: ['./src/setupTests.js'],
}; 
