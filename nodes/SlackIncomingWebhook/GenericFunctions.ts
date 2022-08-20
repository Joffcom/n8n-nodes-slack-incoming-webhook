import {
	OptionsWithUri,
} from 'request';

import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';

import {
	IDataObject,
	JsonObject,
	NodeApiError,
} from 'n8n-workflow';

export async function slackWebhookRequest(
	this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	headers: IDataObject = {},
) {

	const credentials = await this.getCredentials('slackIncomingWebhookApi');

	const options: OptionsWithUri = {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
		body,
		qs,
		uri: credentials.webhookUrl as string,
		json: true,
	};

	try {
		if (Object.keys(headers).length !== 0) {
			options.headers = Object.assign({}, options.headers, headers);
		}

		if (Object.keys(body).length === 0) {
			delete options.body;
		}

		return await this.helpers.requestWithAuthentication.call(this, 'slackIncomingWebhookApi', options);

	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
