/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { WelcomeWidget } from 'vs/workbench/contrib/welcomeDialog/browser/welcomeWidget';
import { IStorageService, StorageScope, StorageTarget } from 'vs/platform/storage/common/storage';
import { ICodeEditor } from 'vs/editor/browser/editorBrowser';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { ICommandService } from 'vs/platform/commands/common/commands';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IOpenerService } from 'vs/platform/opener/common/opener';
import { ONBOARDING_FEATURES } from './onboardingFeatures';
import { localize } from 'vs/nls';

const ONBOARDING_SHOWN_KEY = 'workbench.onboarding.shown';

export class OnboardingWidget extends WelcomeWidget {
	constructor(
		editor: ICodeEditor,
		@IInstantiationService instantiationService: IInstantiationService,
		@ICommandService commandService: ICommandService,
		@ITelemetryService telemetryService: ITelemetryService,
		@IOpenerService openerService: IOpenerService,
		@IStorageService private readonly storageService: IStorageService,
	) {
		super(editor, instantiationService, commandService, telemetryService, openerService);
	}

	public async render(): Promise<void> {
		const title = localize('onboarding.welcome.title', "Welcome to Visual Studio Code!");
		const message = localize('onboarding.welcome.description', "Let's explore some of the most useful features to help you get started.");
		const buttonText = localize('onboarding.getStarted.label', "Get Started");
		const buttonAction = ONBOARDING_FEATURES[0].command;

		await super.render(title, message, buttonText, buttonAction);

		// Build feature list
		const featureList = ONBOARDING_FEATURES.map(feature =>
			`### ${feature.title}\n${feature.description}`
		).join('\n\n');

		// Add feature list to the widget
		await this.buildWidgetContent(title, featureList, buttonText, buttonAction);

		// Mark as shown
		this.markAsShown();
	}

	private markAsShown(): void {
		this.storageService.store(
			ONBOARDING_SHOWN_KEY,
			true,
			StorageScope.APPLICATION,
			StorageTarget.USER
		);
	}

	public static hasBeenShown(storageService: IStorageService): boolean {
		return storageService.getBoolean(ONBOARDING_SHOWN_KEY, StorageScope.APPLICATION, false);
	}
}
