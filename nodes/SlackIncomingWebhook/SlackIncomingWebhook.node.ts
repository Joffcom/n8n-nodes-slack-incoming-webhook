import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow';

import {
	slackWebhookRequest,
} from './GenericFunctions';

import {
	webhookOperations
} from './WebhookDescription';

export class SlackIncomingWebhook implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Slack Incoming Webhook',
		name: 'slackIncomingWebhook',
		icon: 'file:slack.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Send messages to Slack using the legacy incoming Webhooks add-on',
		defaults: {
			name: 'Slack Incoming Webhook',
			color: '#0b3d91',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'slackIncomingWebhookApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Send Message',
						value: 'sendMessage',
						description: 'Send Message to Slack',
						action: 'Send message to slack',
					},
				],
				default: 'sendMessage',
			},
			...webhookOperations,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		let responseData;

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const options = this.getNodeParameter('options', i) as IDataObject;
				if (operation === 'sendMessage') {

					const body: IDataObject = {};

					const message = this.getNodeParameter('message', i) as string;
					body.text = message;

					if (options.name !== undefined) {
						body.username = options.name as string;
					}

					if (options.icon !== undefined) {
						body.icon_emoji = options.icon as string;
					}

					responseData = await slackWebhookRequest.call(this, 'POST', body);
					responseData = {'status': responseData};
				}
				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else {
					returnData.push(responseData as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: (error as JsonObject).message });
					continue;
				}
				throw error;
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
