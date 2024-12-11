/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { registerWorkbenchContribution2 } from 'vs/workbench/common/contributions';
import { LifecyclePhase } from 'vs/workbench/services/lifecycle/common/lifecycle';
import { IWorkbenchContribution } from 'vs/workbench/common/contributions';
import { IStorageService } from 'vs/platform/storage/common/storage';
import { ICodeEditorService } from 'vs/editor/browser/services/codeEditorService';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { OnboardingWidget } from 'vs/workbench/contrib/onboarding/browser/onboardingWidget';
import { Registry } from 'vs/platform/registry/common/platform';
import { Extensions as WorkbenchExtensions, IWorkbenchContributionsRegistry } from 'vs/workbench/common/contributions';
import { localize } from 'vs/nls';

class OnboardingContribution implements IWorkbenchContribution {

	static readonly ID = 'workbench.contrib.onboarding';

	constructor(
		@IStorageService private readonly storageService: IStorageService,
		@ICodeEditorService private readonly codeEditorService: ICodeEditorService,
		@IInstantiationService private readonly instantiationService: IInstantiationService
	) {
		this.handleFirstStartup();
	}

	private async handleFirstStartup(): Promise<void> {
		// Check if onboarding has been shown before
		if (OnboardingWidget.hasBeenShown(this.storageService)) {
			return;
		}

		// Get the active editor
		const editor = this.codeEditorService.getActiveCodeEditor();
		if (!editor) {
			return;
		}

		// Create and render the onboarding widget
		const widget = this.instantiationService.createInstance(OnboardingWidget, editor);
		await widget.render();
	}
}

Registry.as<IWorkbenchContributionsRegistry>(WorkbenchExtensions.Workbench)
	.registerWorkbenchContribution2(OnboardingContribution.ID, OnboardingContribution, LifecyclePhase.Eventually);
