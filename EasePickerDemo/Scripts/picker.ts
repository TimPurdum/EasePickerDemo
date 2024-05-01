import { easepick } from '@easepick/bundle';
import { IPickerConfig } from '@easepick/core/dist/types';

export async function createPicker(options: IPickerConfig) {
    const picker = new easepick.create(options);
    return picker;
}
