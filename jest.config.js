module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/dist/', '/node_modules/'],
    
    // Adding custom reporters for detailed reports
    reporters: [
      'default',  // Keep the default Jest console output
      ['jest-html-reporter', {
        pageTitle: 'Test Report',
        outputPath: './reports/test-report.html',  // Path to save HTML report
        includeFailureMsg: true,  // Include failure messages
        includeConsoleLog: true,  // Include console logs in the report
        theme: 'default',  // Changed to 'default' theme
      }],
      ['jest-junit', {
        outputDirectory: './reports',  // Path to store JUnit XML
        outputName: 'junit.xml',  // JUnit file name
      }]
    ]
};
