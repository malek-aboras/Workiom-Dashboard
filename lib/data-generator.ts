import { AutomationExecution, AutomationStatus } from "./types";

const APPS = [
  "Workiom",
  "Salesforce",
  "HubSpot",
  "Zapier",
  "Make.com",
  "Monday.com",
  "Airtable",
  "ClickUp",
  "Notion",
  "Asana",
];

const LISTS = [
  "Customer Database",
  "Sales Pipeline",
  "Project Tasks",
  "Inventory Management",
  "Employee Records",
  "Support Tickets",
  "Marketing Campaigns",
  "Financial Transactions",
  "Product Catalog",
  "Order Processing",
];

const AUTOMATION_NAMES = [
  "New Customer Onboarding",
  "Lead Assignment",
  "Task Auto-Assignment",
  "Email Notification Trigger",
  "Data Sync",
  "Report Generation",
  "Status Update Automation",
  "Invoice Creation",
  "Inventory Alert",
  "Customer Follow-up",
  "Team Notification",
  "Record Duplication",
  "Field Calculation",
  "Workflow Trigger",
  "Integration Sync",
];

const STATUSES: AutomationStatus[] = ["Success", "Failed", "Success with Warning"];
const STATUS_WEIGHTS = [0.75, 0.15, 0.1]; // 75% success, 15% failed, 10% warning

function weightedRandom(weights: number[]): number {
  const random = Math.random();
  let sum = 0;
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (random < sum) return i;
  }
  return weights.length - 1;
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateAutomationData(count: number = 1000): AutomationExecution[] {
  const data: AutomationExecution[] = [];
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30); // Last 30 days

  for (let i = 1; i <= count; i++) {
    const statusIndex = weightedRandom(STATUS_WEIGHTS);
    const app = randomElement(APPS);
    const list = randomElement(LISTS);

    data.push({
      automationId: `AUTO-${String(i).padStart(4, "0")}`,
      automationName: randomElement(AUTOMATION_NAMES),
      automationAppName: app,
      automationListName: list,
      automationExecutionDateTime: randomDate(startDate, endDate),
      automationStatus: STATUSES[statusIndex],
    });
  }

  // Sort by date descending (most recent first)
  return data.sort(
    (a, b) =>
      b.automationExecutionDateTime.getTime() -
      a.automationExecutionDateTime.getTime()
  );
}

// For demo purposes, cache the generated data
let cachedData: AutomationExecution[] | null = null;

export function getAutomationData(): AutomationExecution[] {
  if (!cachedData) {
    cachedData = generateAutomationData(1000);
  }
  return cachedData;
}
