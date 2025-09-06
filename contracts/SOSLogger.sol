// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SOSLogger {
    struct SOSEvent {
        uint256 fid;
        int256 latitude;
        int256 longitude;
        string audioClipUrl;
        uint256 timestamp;
        address sender;
    }

    mapping(uint256 => SOSEvent[]) public sosEventsByFid;
    SOSEvent[] public allSOSEvents;

    event SOSTriggered(
        uint256 indexed fid,
        int256 latitude,
        int256 longitude,
        string audioClipUrl,
        uint256 timestamp,
        address sender
    );

    // Scaling factor for latitude and longitude
    int256 private constant COORD_SCALING_FACTOR = 1e6;

    function logSOS(
        uint256 fid,
        int256 latitude,
        int256 longitude,
        string memory audioClipUrl
    ) public {
        SOSEvent memory newEvent = SOSEvent({
            fid: fid,
            latitude: latitude,
            longitude: longitude,
            audioClipUrl: audioClipUrl,
            timestamp: block.timestamp,
            sender: msg.sender
        });

        sosEventsByFid[fid].push(newEvent);
        allSOSEvents.push(newEvent);

        emit SOSTriggered(
            fid,
            latitude,
            longitude,
            audioClipUrl,
            block.timestamp,
            msg.sender
        );
    }

    function getSOSEventsByFid(uint256 fid) public view returns (SOSEvent[] memory) {
        return sosEventsByFid[fid];
    }

    function getAllSOSEvents() public view returns (SOSEvent[] memory) {
        return allSOSEvents;
    }

    function getSOSSCountByFid(uint256 fid) public view returns (uint256) {
        return sosEventsByFid[fid].length;
    }

    function getTotalSOSCount() public view returns (uint256) {
        return allSOSEvents.length;
    }
}