/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useAgent } from '@/lib/state';

export default function Header() {
  const { current } = useAgent();

  return (
    <header>
      <div className="roomInfo">
        <div className="roomName">
          <h1>{current.name}</h1>
        </div>
      </div>
    </header>
  );
}