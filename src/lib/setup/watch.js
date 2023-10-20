/*
 * Copyright 2023 Comcast Cable Communications Management, LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import symbols from '../symbols'

export default (component, watchers) => {
  component.prototype[symbols.watchKeys] = []
  component.prototype[symbols.watchers] = {}

  for (let watch in watchers) {
    if (typeof watchers[watch] !== 'function') {
      console.warn(`${watch} is not a function`)
    }

    component.prototype[symbols.watchKeys].push(watch)

    component.prototype[symbols.watchers][watch] = function (v, old) {
      watchers[watch].call(this, v, old)
    }
  }
}
